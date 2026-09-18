import { Field } from 'formik';
import { DESIGN_OPTION_ICONS } from '../../lib/designOptionIcons';
import { DesignSection } from '../../lib/designConfig';
import { DESIGN_ICONS } from './orderConstants';

export default function DesignSectionBlock({
  section,
  namePrefix,
}: {
  section: DesignSection;
  namePrefix: string;
}) {
  if (section.type === 'toggle') {
    return (
      <div className="border border-secondary-200 rounded-xl p-2.5 bg-white/80 hover:shadow-soft transition">
        <label className="relative flex items-center gap-2.5 cursor-pointer hover:border-primary-300 transition select-none">
          <Field type="checkbox" name={`${namePrefix}.enabled`} className="peer sr-only" />
          <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary-100/70 border border-primary-200/70 text-primary-700 shadow-sm shrink-0 peer-checked:bg-primary-200/80 peer-checked:text-primary-800">
            {DESIGN_OPTION_ICONS[section.label]}
          </span>
          <span className="text-[12px] text-secondary-800 peer-checked:text-primary-800 font-medium flex-1 leading-tight">
            Add {section.label}
          </span>
          <span className="w-5 h-5 rounded-full border-2 border-secondary-300 flex items-center justify-center text-[10px] font-bold text-transparent peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-checked:text-white transition shrink-0">
            ✓
          </span>
        </label>
      </div>
    );
  }

  return (
    <div className="border border-secondary-200 rounded-xl p-3 bg-white/80 hover:shadow-soft transition">
      <p className="text-secondary-900 text-[11px] font-semibold mb-2 flex items-center gap-1.5">
        <span className="text-primary-600">{DESIGN_ICONS[section.key]}</span>
        {section.label}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {section.options.map((opt) => (
          <label
            key={opt.value}
            className="relative flex items-center gap-2.5 rounded-xl border border-secondary-200 bg-white/70 py-2 pl-2 pr-2.5 cursor-pointer hover:border-primary-300 transition select-none shadow-sm"
          >
            <Field
              type="radio"
              name={`${namePrefix}.selected`}
              value={opt.value}
              className="peer sr-only"
            />
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100/70 border border-primary-200/70 text-primary-700 shadow-sm shrink-0 peer-checked:bg-primary-200/80 peer-checked:text-primary-800">
              {DESIGN_OPTION_ICONS[opt.value]}
            </span>
            <span className="text-[12px] leading-tight text-secondary-800 peer-checked:text-primary-800 flex-1">
              {opt.value}
            </span>
            <span className="w-4 h-4 rounded-full border-2 border-secondary-300 flex items-center justify-center text-[9px] font-bold text-transparent peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-checked:text-white transition shrink-0">
              ✓
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}