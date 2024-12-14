import { useState, useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface Option {
  id: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selectedIds,
  onChange,
  placeholder = 'Select items...',
  className = '',
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOptions = options.filter(option => selectedIds.includes(option.id));

  const handleToggleOption = (optionId: string) => {
    const newSelectedIds = selectedIds.includes(optionId)
      ? selectedIds.filter(id => id !== optionId)
      : [...selectedIds, optionId];
    onChange(newSelectedIds);
  };

  const handleRemoveOption = (optionId: string) => {
    onChange(selectedIds.filter(id => id !== optionId));
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        className="min-h-[38px] p-1 border rounded-md bg-white cursor-text flex flex-wrap gap-1 items-center"
        onClick={() => setIsOpen(true)}
      >
        {selectedOptions.map(option => (
          <span
            key={option.id}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {option.label}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveOption(option.id);
              }}
              className="hover:bg-blue-200 rounded-full p-0.5"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          className="flex-1 outline-none min-w-[120px] text-sm"
          placeholder={selectedOptions.length === 0 ? placeholder : ''}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-2 text-gray-500 text-sm">No options found</div>
          ) : (
            filteredOptions.map(option => (
              <div
                key={option.id}
                className={`p-2 cursor-pointer flex items-center gap-2 text-sm hover:bg-gray-100
                  ${selectedIds.includes(option.id) ? 'bg-gray-50' : ''}`}
                onClick={() => handleToggleOption(option.id)}
              >
                <div className={`w-4 h-4 border rounded flex items-center justify-center
                  ${selectedIds.includes(option.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}
                >
                  {selectedIds.includes(option.id) && <Check size={12} className="text-white" />}
                </div>
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
} 