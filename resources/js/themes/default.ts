const TButton = {
  classes: 'text-white bg-primary font-medium text-lg border-primary',
  variants: {
    secondary:
      ' bg-indigo-100 text-indigo-500 font-medium text-lg border-indigo-100',
  },
  fixedClasses:
    'transform ease-in-out duration-100 rounded-lg border block inline-flex items-center justify-center py-2 px-4 mx-2',
}
const TTag = {
  variants: {
    badgeSuccess:
      'bg-green-100 text-green-500 font-medium text-xs border-green-100',
    badge: 'bg-green-100 text-green-500 font-medium text-xs border-indigo-100',
  },
  fixedClasses: 'rounded-full py-2 px-2',
}

export default {
  TButton,
  TTag,
}
