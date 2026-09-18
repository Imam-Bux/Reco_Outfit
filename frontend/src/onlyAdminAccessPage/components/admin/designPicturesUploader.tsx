import { useState } from 'react';
import { getErrorMessage, uploadImages } from '../../lib/api';
import { PlusIcon, SparklesIcon } from './icons';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export default function DesignPicturesUploader({
  namePrefix,
  value,
  setFieldValue,
  token,
}: {
  namePrefix: string;
  value: string[];
  setFieldValue: (field: string, value: unknown) => void;
  token: string | null;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileList = Array.from(files);
    const overSized = fileList.find((f) => f.size > MAX_IMAGE_SIZE);
    if (overSized) {
      alert(`${overSized.name} exceeds the 5MB size limit.`);
      return;
    }
    setUploading(true);
    try {
      const urls = await uploadImages(fileList, token);
      setFieldValue(namePrefix, [...(value ?? []), ...urls]);
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url: string) => {
    setFieldValue(namePrefix, (value ?? []).filter((u) => u !== url));
  };

  return (
    <div className="border border-secondary-200 rounded-xl p-3 bg-white/80 hover:shadow-soft transition">
      <p className="text-secondary-900 text-[11px] font-semibold mb-2 flex items-center gap-1.5">
        <span className="text-primary-600"><SparklesIcon width={13} height={13} strokeWidth={2} /></span>
        Design Pictures
      </p>

      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
          {value.map((url, idx) => (
            <div
              key={idx}
              className="relative group border border-secondary-200 rounded-lg overflow-hidden aspect-square bg-secondary-100 shadow-sm"
            >
              <img src={url} alt={`Design picture ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                title="Remove picture"
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white text-[11px] leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="inline-flex items-center gap-2 border border-primary-400 bg-primary-50 text-primary-800 text-[11px] font-medium rounded-xl px-4 py-2 hover:bg-primary-100 cursor-pointer shadow-sm">
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
        <PlusIcon width={13} height={13} strokeWidth={2.5} />
        {uploading ? 'Uploading...' : 'Add pictures'}
      </label>
    </div>
  );
}