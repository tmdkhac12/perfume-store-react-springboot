import { useState, useRef, useEffect } from 'react';

/**
 * @description: A custom searchable dropdown component for selecting options with filter support.
 * @param {Object} props
 * @param {string[]} props.options - List of string options to display.
 * @param {string} props.value - Currently selected value.
 * @param {Function} props.onChange - Callback triggered when an option is selected.
 * @param {string} props.placeholder - Text to show when no value is selected.
 * @param {boolean} props.disabled - Whether the dropdown is disabled.
 * @param {string} props.name - Name attribute for the selection.
 * @param {Function} props.onExpand - Optional callback triggered when the dropdown expands.
 */
function SearchableSelect({ options = [], value, onChange, placeholder = 'Select option', disabled = false, name, onExpand }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search query
  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * @description: Handles selecting an option and notifies parent.
   * @param {string} option - The selected option value.
   */
  const handleSelect = (option) => {
    // Construct a synthetic event object to match standard select onChange
    onChange({ target: { name, value: option } });
    setIsExpanded(false);
    setSearchQuery('');
  };

  const toggleDropdown = () => {
    if (!disabled) {
      const nextState = !isExpanded;
      setIsExpanded(nextState);
      if (nextState) {
        setSearchQuery('');
        onExpand?.();
      }
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-left flex justify-between items-center transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-accent'
          } ${isExpanded ? 'border-accent ring-1 ring-accent/20' : ''}`}
        disabled={disabled}
      >
        <span className={`font-body truncate ${value ? 'text-on-surface' : 'text-on-surface-variant'}`}>
          {value || placeholder}
        </span>
        <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {/* Dropdown Menu */}
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest border border-outline-variant/30 rounded-[24px] shadow-xl z-[110] overflow-hidden flex flex-col max-h-64 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search Input Area */}
          <div className="p-3 border-b border-outline-variant/10 bg-surface-container/30">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-sm">search</span>
              <input
                type="text"
                autoFocus
                className="w-full bg-surface-container border border-outline-variant/20 py-2 pl-9 pr-4 rounded-[20px] text-sm font-body text-on-surface focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Options List */}
          <div className="overflow-y-auto py-2 custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`w-full text-left px-6 py-3 font-body text-sm transition-colors hover:bg-surface-container ${value === opt ? 'bg-accent/10 text-accent font-semibold' : 'text-on-surface'
                    }`}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </button>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <span className="material-symbols-outlined text-outline-variant text-3xl mb-2">search_off</span>
                <p className="text-on-surface-variant text-xs italic">Không tìm thấy kết quả</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchableSelect;
