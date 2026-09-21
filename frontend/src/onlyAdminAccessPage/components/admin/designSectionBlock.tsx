import { ErrorMessage, Field, getIn, useFormikContext } from 'formik';
import { useState } from 'react';
import { getErrorMessage, uploadImage } from '../../lib/api';
import { isCustomOption } from '../../lib/designConfig';
import { DESIGN_OPTION_ICONS } from '../../lib/designOptionIcons';
import { DesignSection } from '../../lib/designConfig';
import { DESIGN_ICONS } from './orderConstants';
import { PlusIcon } from './icons';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

type SectionValue = {
  selected?: string;
  enabled?: boolean;
  referenceImage?: string;
  customText?: string;
};

function CustomEditor({
  namePrefix,
  referenceImage,
  uploading,
  setUploading,
  token,
}: {
  namePrefix: string;
  referenceImage?: string;
  uploading: boolean;
  setUploading: (value: boolean) => void;
  token: string | null;
}) {
  const { setFieldValue } = useFormikContext<Record<string, unknown>>();

  const handleImage = async (file: File | null) => {
    if (!file) return;
    if (file.size > MAX_IMAGE_SIZE) {
      alert(`${file.name} exceeds the 5MB size limit.`);
      return;
    }
    setUploading(true);
    try {
      const url = await uploadImage(file, token);
      if (url) setFieldValue(`${namePrefix}.referenceImage`, url);
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-2 space-y-2 rounded-xl border border-dashed border-secondary-300 bg-secondary-50 p-2.5">
      <p className="text-[10px] uppercase tracking-wide font-semibold text-secondary-500">
        Custom Detail
      </p>
      <Field
        name={`${namePrefix}.customText`}
        placeholder="Describe the custom design (text allowed)..."
        className="w-full bg-white border border-secondary-300 focus:border-primary-500 focus:ring-primary-500/30 rounded-lg px-3 py-2 text-secondary-900 text-[11px] placeholder:text-secondary-400 shadow-sm"
      />
      <div className="flex items-center gap-2 flex-wrap">
        {referenceImage && (
          <div className="relative group border border-secondary-200 rounded-lg overflow-hidden w-14 h-14 bg-secondary-100 shadow-sm">
            <img src={referenceImage} alt="Custom reference" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => setFieldValue(`${namePrefix}.referenceImage`, '')}
              title="Remove image"
              className="absolute top-0.5 right-0.5 w-4.5 h-4.5 rounded-full bg-black/70 text-white text-[10px] leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              ×
            </button>
          </div>
        )}
        <label className="inline-flex items-center gap-1.5 border border-primary-400 bg-primary-50 text-primary-800 text-[11px] font-medium rounded-lg px-3 py-2 hover:bg-primary-100 cursor-pointer shadow-sm">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              handleImage(e.target.files?.[0] ?? null);
              e.target.value = '';
            }}
          />
          <PlusIcon width={12} height={12} strokeWidth={2.5} />
          {uploading ? 'Uploading...' : referenceImage ? 'Change image' : 'Add image'}
        </label>
      </div>
    </div>
  );
}

export default function DesignSectionBlock({
  section,
  namePrefix,
  token,
}: {
  section: DesignSection;
  namePrefix: string;
  token: string | null;
}) {
  const { values, setFieldValue } = useFormikContext<Record<string, unknown>>();
  const [uploading, setUploading] = useState(false);
  const sectionValue = (getIn(values, namePrefix) ?? {}) as SectionValue;

  const selected = sectionValue.selected ?? '';

  const handleSelect = (optValue: string) => {
    setFieldValue(`${namePrefix}.selected`, optValue);
    if (!isCustomOption(optValue)) {
      setFieldValue(`${namePrefix}.customText`, '');
      setFieldValue(`${namePrefix}.referenceImage`, '');
    }
  };

  return (
    <div className="border border-secondary-200 rounded-xl p-3 bg-white/80 hover:shadow-soft transition">
      <p className="text-secondary-900 text-[11px] font-semibold mb-2 flex items-center gap-1.5">
        <span className="text-primary-600">{DESIGN_ICONS[section.key]}</span>
        {section.label}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {section.options.map((opt) => {
          const isCustom = isCustomOption(opt.value);
          return (
            <label
              key={opt.value}
              className={`relative flex items-center gap-2.5 rounded-xl border bg-white/70 py-2 pl-2 pr-2.5 cursor-pointer hover:border-primary-300 transition select-none shadow-sm ${
                isCustom ? 'border-dashed border-secondary-300' : 'border-secondary-200'
              }`}
            >
              <Field
                type="radio"
                name={`${namePrefix}.selected`}
                value={opt.value}
                checked={selected === opt.value}
                onChange={() => handleSelect(opt.value)}
                className="peer sr-only"
              />
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100/70 border border-primary-200/70 text-primary-700 shadow-sm shrink-0 peer-checked:bg-primary-200/80 peer-checked:text-primary-800">
                {DESIGN_OPTION_ICONS[opt.value as keyof typeof DESIGN_OPTION_ICONS]}
              </span>
              <span className="text-[12px] leading-tight text-secondary-800 peer-checked:text-primary-800 flex-1">
                {opt.value}
              </span>
              <span className="w-4 h-4 rounded-full border-2 border-secondary-300 flex items-center justify-center text-[9px] font-bold text-transparent peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-checked:text-white transition shrink-0">
                ✓
              </span>
            </label>
          );
        })}
      </div>
      {isCustomOption(selected) && (
        <CustomEditor
          namePrefix={namePrefix}
          referenceImage={sectionValue.referenceImage}
          uploading={uploading}
          setUploading={setUploading}
          token={token}
        />
      )}
      <ErrorMessage
        name={`${namePrefix}.selected`}
        component="p"
        className="text-red-600 text-[10px] mt-1.5"
      />
      <ErrorMessage name={namePrefix}>
        {(msg) =>
          typeof msg === 'string' ? (
            <p className="text-red-600 text-[10px] mt-1">{msg}</p>
          ) : null
        }
      </ErrorMessage>
    </div>
  );
}