const TButton = {
  classes:
    'text-white bg-primary font-medium text-lg border-primary py-2 px-4 mx-2',
  variants: {
    secondary:
      ' bg-indigo-100 text-indigo-500 font-medium text-lg border-indigo-100 py-2 px-4 mx-2',
    success:
      'text-white bg-green-500 font-medium text-lg border-green-500 py-2 px-4 mx-2',
    error:
      'text-white bg-red-500 font-medium text-lg border-red-500 py-2 px-4 mx-2',
    icon:
      'text-gray-500 bg-gray-100 border-gray-100 py-2 px-2 mx-2 hover:text-white hover:bg-primary',
    pagination:
      'text-gray-400 bg-gray-100 border-gray-100 w-8 h-8 mx-2 hover:text-white hover:bg-primary',
    paginationNumber:
      'border-transparent text-gray-600 w-8 h-8 mx-1 hover:text-white hover:bg-primary disabled:opacity-50',
  },
  fixedClasses:
    'transform ease-in-out duration-100 rounded-lg border block inline-flex items-center justify-center',
}
const TTag = {
  variants: {
    badge:
      'bg-indigo-100 text-indigo-500 font-medium text-xs border-indigo-100',
    'badge-danger':
      'bg-red-100 text-red-500 font-medium text-xs border-red-100',
    'badge-success':
      'bg-green-100 text-green-500 font-medium text-xs border-green-100',
  },
  fixedClasses: 'rounded-sm py-2 px-2',
}

const TRichSelect = {
  fixedClasses: {
    wrapper: 'relative',
    buttonWrapper: 'inline-block relative w-full',
    selectButton:
      'w-full flex text-left justify-between items-center transform ease-in-out duration-300',
    selectButtonLabel: 'block truncate',
    selectButtonPlaceholder: 'block truncate',
    selectButtonIcon: 'fill-current flex-shrink-0 ml-4 h-4 w-4',
    selectButtonClearButton:
      'flex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 h-6 w-6',
    selectButtonClearIcon: 'fill-current h-3 w-3',
    dropdown: 'absolute w-full z-10',
    dropdownFeedback: '',
    loadingMoreResults: '',
    optionsList: 'overflow-auto',
    searchWrapper: 'inline-block w-full',
    searchBox: 'inline-block w-full',
    optgroup: '',
    option: '',
    highlightedOption: '',
    selectedOption: '',
    selectedHighlightedOption: '',
    optionContent: '',
    optionLabel: 'truncate block',
    selectedIcon: 'fill-current h-4 w-4',
    enterClass: '',
    enterActiveClass: '',
    enterToClass: '',
    leaveClass: '',
    leaveActiveClass: '',
    leaveToClass: '',
  },
  classes: {
    wrapper: '',
    buttonWrapper: '',
    selectButton:
      'bg-gray-100 border-transparent rounded py-1 pr-2 pl-4 focus:outline-none focus:shadow-outline focus:bg-primary focus:text-white hover:bg-primary hover:text-white',
    selectButtonLabel: '',
    selectButtonPlaceholder: 'text-gray-500',
    selectButtonIcon: '',
    selectButtonClearButton: 'hover:bg-gray-200 text-gray-500 rounded',
    selectButtonClearIcon: '',
    dropdown: 'rounded bg-white shadow',
    dropdownFeedback: 'text-sm text-gray-500',
    loadingMoreResults: 'text-sm text-gray-500',
    optionsList: '',
    searchWrapper: 'bg-white p-2',
    searchBox:
      'p-2 bg-gray-200 text-sm rounded border focus:outline-none focus:shadow-outline',
    optgroup: 'text-gray-500 uppercase text-xs py-1 px-2 font-semibold',
    option: '',
    highlightedOption: 'bg-gray-300',
    selectedOption: 'font-semibold bg-gray-100',
    selectedHighlightedOption: 'bg-gray-300 font-semibold',
    optionContent: 'flex justify-between items-center p-2 cursor-pointer',
    optionLabel: 'truncate block',
    selectedIcon: '',
    enterClass: '',
    enterActiveClass: 'opacity-0 transition ease-out duration-100',
    enterToClass: 'opacity-100',
    leaveClass: 'transition ease-in opacity-100',
    leaveActiveClass: '',
    leaveToClass: 'opacity-0 duration-75',
  },
  variants: {
    danger: {
      selectButton:
        'border-red-500 text-red-500 bg-red-100 border rounded p-2 focus:outline-none focus:shadow-outline',
      selectButtonPlaceholder: 'text-red-400',
      selectButtonClearButton: 'hover:bg-red-200 text-red-500 rounded',
    },
    success: {
      selectButton:
        'border-green-500 text-green-500 bg-green-100 border rounded p-2 focus:outline-none focus:shadow-outline',
      selectButtonPlaceholder: 'text-green-400',
      selectButtonClearButton: 'hover:bg-green-200 text-green-500 rounded',
    },
  },
}
export default {
  TButton,
  TTag,
  TRichSelect,
}
