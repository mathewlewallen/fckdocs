import type * as React from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import type {
  ColorScheme,
  ColorWeight,
  RadiusNest,
  RadiusSize,
  ShadowSize,
  SpacingToken,
  TextSize,
  TextType,
  TextVariant,
  TextWeight,
  flex,
  gridColumns,
} from './types';
import type { Flex, Input, IconButton } from '@fck/components/ui';
import type { Placement } from '@floating-ui/react-dom';
import type { IconName } from '@fck/components/icons';

type AsProp<T extends React.ElementType> = {
  as?: T;
};

type PolymorphicProps<T extends React.ElementType, P = object> =
  P & AsProp<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof P | 'as'>;

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  tabletDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  mobileDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  horizontal?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';
  vertical?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';
  center?: boolean;
  wrap?: boolean;
  flex?: flex;
}
type TextProps<T extends React.ElementType = 'span'> =
  PolymorphicProps<T> & {
    variant?: TextVariant;
    wrap?: CSSProperties['textWrap'];
    size?: TextSize;
    weight?: TextWeight;
  };

type SizeProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: number | SpacingToken;
  height?: number | SpacingToken;
  maxWidth?: number | SpacingToken;
  minWidth?: number | SpacingToken;
  minHeight?: number | SpacingToken;
  maxHeight?: number | SpacingToken;
  fit?: boolean;
  fitWidth?: boolean;
  fitHeight?: boolean;
  fill?: boolean;
  fillWidth?: boolean;
  fillHeight?: boolean;
  aspectRatio?: CSSProperties['aspectRatio'];
}

type SpacingProps = React.HTMLAttributes<HTMLDivElement> & {
  padding?: SpacingToken;
  paddingLeft?: SpacingToken;
  paddingRight?: SpacingToken;
  paddingTop?: SpacingToken;
  paddingBottom?: SpacingToken;
  paddingX?: SpacingToken;
  paddingY?: SpacingToken;
  margin?: SpacingToken;
  marginLeft?: SpacingToken;
  marginRight?: SpacingToken;
  marginTop?: SpacingToken;
  marginBottom?: SpacingToken;
  marginX?: SpacingToken;
  marginY?: SpacingToken;
  gap?: SpacingToken | '-1';
  top?: SpacingToken;
  right?: SpacingToken;
  bottom?: SpacingToken;
  left?: SpacingToken;
}

type StyleProps = React.HTMLAttributes<HTMLDivElement> & {
  textVariant?: TextVariant;
  textSize?: TextSize;
  textType?: TextType;
  textWeight?: TextWeight;
  background?:
    | `${ColorScheme}-${ColorWeight}`
    | `${ColorScheme}-alpha-${ColorWeight}`
    | 'surface'
    | 'overlay'
    | 'page'
    | 'transparent';
  solid?: `${ColorScheme}-${ColorWeight}`;
  borderTop?:
    | `${ColorScheme}-${ColorWeight}`
    | `${ColorScheme}-alpha-${ColorWeight}`
    | 'surface'
    | 'transparent';
  borderRight?:
    | `${ColorScheme}-${ColorWeight}`
    | `${ColorScheme}-alpha-${ColorWeight}`
    | 'surface'
    | 'transparent';
  borderBottom?:
    | `${ColorScheme}-${ColorWeight}`
    | `${ColorScheme}-alpha-${ColorWeight}`
    | 'surface'
    | 'transparent';
  borderLeft?:
    | `${ColorScheme}-${ColorWeight}`
    | `${ColorScheme}-alpha-${ColorWeight}`
    | 'surface'
    | 'transparent';
  border?:
    | `${ColorScheme}-${ColorWeight}`
    | `${ColorScheme}-alpha-${ColorWeight}`
    | 'surface'
    | 'transparent';
  borderStyle?: 'solid' | 'dashed';
  borderWidth?: 1 | 2;
  topRadius?: RadiusSize;
  rightRadius?: RadiusSize;
  bottomRadius?: RadiusSize;
  leftRadius?: RadiusSize;
  topLeftRadius?: RadiusSize;
  topRightRadius?: RadiusSize;
  bottomLeftRadius?: RadiusSize;
  bottomRightRadius?: RadiusSize;
  radius?: RadiusSize | `${RadiusSize}-${RadiusNest}`;
  shadow?: ShadowSize;
  cursor?: CSSProperties['cursor'] | 'interactive';
}

type ConditionalProps = React.HTMLAttributes<HTMLDivElement> & {
  hide?: 's' | 'm' | 'l';
  show?: 's' | 'm' | 'l';
}

type DisplayProps<T extends React.ElementType = 'div'> = PolymorphicProps<T> & {
  inline?: boolean;
  pointerEvents?: 'none' | 'all' | 'auto';
  position?: CSSProperties['position'];
  overflow?: CSSProperties['overflow'];
  overflowX?: CSSProperties['overflowX'];
  overflowY?: CSSProperties['overflowY'];
  transition?:
    | 'micro-short'
    | 'micro-medium'
    | 'micro-long'
    | 'macro-short'
    | 'macro-medium'
    | 'macro-long';
  opacity?: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
  zIndex?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

type CommonProps = HTMLAttributes<HTMLDivElement> & {
  onBackground?: `${ColorScheme}-${ColorWeight}`;
  onSolid?: `${ColorScheme}-${ColorWeight}`;
  align?: CSSProperties["textAlign"];
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "s" | "m" | "l";
  radius?:
    | "none"
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-left"
    | "top-right"
    | "bottom-right"
    | "bottom-left";
  label?: string;
  weight?: "default" | "strong";
  prefixIcon?: IconName | string;
  suffixIcon?: IconName | string;
  loading?: boolean;
  fillWidth?: boolean;
  justifyContent?: "flex-start" | 'start' | "center" | "flex-end" | 'end' | "space-between";
  children?: ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  arrowIcon?: boolean;
}

type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "s" | "m" | "l";
  radius?:
    | "none"
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-left"
    | "top-right"
    | "bottom-right"
    | "bottom-left";
  label?: string;
  weight?: "default" | "strong";
  prefixIcon?: IconName | string;
  suffixIcon?: IconName | string;
  loading?: boolean;
  fillWidth?: boolean;
  justifyContent?: "flex-start" | 'start' | "center" | "flex-end" | 'end' | "space-between";
  children?: ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  arrowIcon?: boolean;
}

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: string;
  id?: string;
  size?: "s" | "m" | "l";
  radius?:
    | "none"
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-left"
    | "top-right"
    | "bottom-right"
    | "bottom-left";
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "ghost";
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  children?: ReactNode;
}

type AnchorIconButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: string;
  id?: string;
  size?: "s" | "m" | "l";
  radius?:
    | "none"
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-left"
    | "top-right"
    | "bottom-right"
    | "bottom-left";
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "ghost";
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  children?: ReactNode;
}

type SmartLinkProps = CommonProps &
React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  prefixIcon?: string;
  suffixIcon?: string;
  fillWidth?: boolean;
  iconSize?: "xs" | "s" | "m" | "l" | "xl";
  selected?: boolean;
  unstyled?: boolean;
  children: ReactNode;
  href?: string;
  style?: React.CSSProperties;
  className?: string;
}

type ToggleButtonProps = {
  label?: ReactNode;
  selected: boolean;
  variant?: "ghost" | "outline";
  size?: "s" | "m" | "l";
  radius?:
    | "none"
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-left"
    | "top-right"
    | "bottom-right"
    | "bottom-left";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between";
  fillWidth?: boolean;
  weight?: "default" | "strong";
  truncate?: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  href?: string;
}

type TiltFxProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  fillWidth?: boolean;
  paddingX?: SpacingToken;
  paddingY?: SpacingToken;
  paddingTop?: SpacingToken;
  paddingBottom?: SpacingToken;
  radius?: string;
  border?: string;
  overflow?: string;
  aspectRatio?: string;
}

type LineProps = React.ComponentProps<typeof Flex> & {
  vert?: boolean;
  style?: React.CSSProperties;
}

type LogoCloudProps = React.HTMLAttributes<HTMLDivElement> & {
  paddingBottom?: string;
  columns?: string;
  mobileColumns?: string;
  limit?: number;
  fillWidth?: boolean;
  logos: Array<{
    icon: boolean;
    wordmarkSrc: string;
    href: string;
    size: string;
  }>;
}

type ThemeSwitchProps = React.HTMLAttributes<HTMLDivElement> & {
  marginTop?: string;
}

type PasswordInputProps = React.HTMLAttributes<HTMLInputElement> & {
  autoComplete?: string;
  id: string;
  label: string;
  labelAsPlaceholder?: boolean;
  radius?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  validate?: () => string | null;
}

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  key?: React.Key;
  fillWidth?: boolean;
  href?: string;
  padding?: string;
  gap?: string;
  background?: string;
  direction?: string;
  borderRight?: string;
  border?: string;
}

type MaskProps = React.HTMLAttributes<HTMLDivElement> & {
  cursor?: boolean;
  x?: number;
  y?: number;
  radius?: number;
}

type GradientProps = React.HTMLAttributes<HTMLDivElement> & {
  display?: boolean;
  opacity?: DisplayProps['opacity'];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  tilt?: number;
  colorStart?: string;
  colorEnd?: string;
}

type DotsProps = React.HTMLAttributes<HTMLDivElement> & {
  display?: boolean;
  opacity?: DisplayProps['opacity'];
  color?: string;
  size?: SpacingToken;
}

type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  columns?: gridColumns;
  rows?: gridColumns;
  tabletColumns?: gridColumns;
  mobileColumns?: gridColumns;
  tabletRows?: gridColumns;
  mobileRows?: gridColumns;
  display?: boolean;
  opacity?: DisplayProps['opacity'];
  color?: string;
  width?: number | SpacingToken;
  height?: number | SpacingToken;
}

type LinesProps = React.HTMLAttributes<HTMLDivElement> & {
  display?: boolean;
  opacity?: DisplayProps['opacity'];
  size?: SpacingToken;
}

type BackgroundProps = React.HTMLAttributes<HTMLDivElement> & {
  position?: CSSProperties['position'];
  gradient?: GradientProps;
  dots?: DotsProps;
  grid?: GridProps;
  lines?: LinesProps;
  mask?: MaskProps;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  height?: 's' | 'm';
  error?: boolean;
  errorMessage?: React.ReactNode;
  description?: React.ReactNode;
  radius?:
    | 'none'
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-left'
    | 'top-right'
    | 'bottom-right'
    | 'bottom-left';
  className?: string;
  style?: React.CSSProperties;
  hasPrefix?: React.ReactNode;
  hasSuffix?: React.ReactNode;
  labelAsPlaceholder?: boolean;
  validate?: (value: React.ReactNode) => React.ReactNode | null;
}

type MetaProps = {
  title: string;
  description: string;
  baseURL: string;
  path?: string;
  type?: 'website' | 'article';
  image?: string;
  publishedTime?: string;
  author?: {
    name: string;
    url?: string;
  };
}

type SmartImageProps<T extends React.ElementType = 'img'> = PolymorphicProps<T> & {
  aspectRatio?: string;
  height?: number;
  alt?: string;
  isLoading?: boolean;
  objectFit?: CSSProperties['objectFit'];
  enlarge?: boolean;
  src: string;
  unoptimized?: boolean;
  sizes?: string;
  priority?: boolean;
}

type MenuLink = {
  label: string;
  href: string;
  icon?: string;
  description?: string;
  selected?: boolean;
}

type MenuSection = {
  title?: string;
  links: MenuLink[];
}

type MenuGroup = {
  label: string;
  suffixIcon?: string;
  href?: string;
  selected?: boolean;
  sections?: MenuSection[];
}

type MegaMenuProps = React.ComponentProps<typeof Flex> & {
  menuGroups: MenuGroup[];
  className?: string;
}

type DropdownWrapperProps = React.ComponentProps<typeof Flex> & {
  fillWidth?: boolean;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  floatingPlacement?: Placement;
  trigger: React.ReactNode;
  dropdown: React.ReactNode;
  selectedOption?: string;
  style?: React.CSSProperties;
  className?: string;
  onSelect?: (value: string) => void;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

type DateRange = {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

type DateRangePickerProps = React.ComponentProps<typeof Flex> & {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  size?: 's' | 'm' | 'l';
}

type DatePickerProps = React.ComponentProps<typeof Flex> & {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  previousMonth?: boolean;
  nextMonth?: boolean;
  timePicker?: boolean;
  defaultDate?: Date;
  defaultTime?: {
    hours: number;
    minutes: number;
  };
  size?: 's' | 'm' | 'l';
  className?: string;
  style?: React.CSSProperties;
  currentMonth?: number;
  currentYear?: number;
  onMonthChange?: (increment: number) => void;
  range?: {
    startDate?: Date;
    endDate?: Date;
  };
  onHover?: (date: Date | null) => void;
}

type GlitchFxProps = React.ComponentProps<typeof Flex> & {
  children: React.ReactNode;
  speed?: 'slow' | 'medium' | 'fast';
  interval?: number;
  trigger?: 'instant' | 'hover' | 'custom';
  continuous?: boolean;
}

type SchemaProps<T extends React.ElementType = 'div'> = PolymorphicProps<T> & {
  as:
    | 'website'
    | 'article'
    | 'blogPosting'
    | 'techArticle'
    | 'webPage'
    | 'organization';
  title: string;
  description: string;
  baseURL: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  author?: {
    name: string;
    url?: string;
    image?: string;
  };
}

type MaskOptions = {
  maskPosition?: string;
}

type HoloFxProps = React.ComponentProps<typeof Flex> & {
  children: React.ReactNode;
  fill?: boolean;
  light?: {
    opacity?: number;
    filter?: string;
    blending?: CSSProperties['mixBlendMode'];
    mask?: MaskOptions;
  };
  burn?: {
    opacity?: number;
    filter?: string;
    blending?: CSSProperties['mixBlendMode'];
    mask?: MaskOptions;
  };
  texture?: {
    opacity?: number;
    filter?: string;
    blending?: CSSProperties['mixBlendMode'];
    image?: string;
    mask?: MaskOptions;
  };
}

type NavIconProps = React.ComponentProps<typeof Flex> & {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isActive: boolean;
}

type NumberInputProps = Omit<
  React.ComponentProps<typeof Input>,
  'type' | 'value' | 'onChange'
> & {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  padStart?: number;
}

type RadioButtonProps = Omit<InteractiveDetailsProps, 'onClick'> & {
  style?: React.CSSProperties;
  className?: string;
  isChecked?: boolean;
  name?: string;
  value?: string;
  disabled?: boolean;
  onToggle?: () => void;
}

type InteractiveDetailsProps = {
  label?: React.ReactNode;
  description?: React.ReactNode;
  iconButtonProps?: IconButtonProps;
  onClick: () => void;
  className?: string;
  id?: string;
}

type RouteGuardProps = {
  children: React.ReactNode;
}

type SkeletonProps = React.ComponentProps<typeof Flex> & {
  shape: 'line' | 'circle' | 'block';
  width?: 'xl' | 'l' | 'm' | 's' | 'xs';
  height?: 'xl' | 'l' | 'm' | 's' | 'xs';
  delay?: '1' | '2' | '3' | '4' | '5' | '6';
  style?: React.CSSProperties;
  className?: string;
}

type SpinnerProps = React.ComponentProps<typeof Flex> & {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

type StyleOverlayProps = React.ComponentProps<typeof Flex> & {
  iconButtonProps?: Partial<React.ComponentProps<typeof IconButton>>;
}

type SwitchProps = Omit<InteractiveDetailsProps, 'onClick'> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    style?: React.CSSProperties;
    className?: string;
    isChecked: boolean;
    name?: string;
  value?: string;
  disabled?: boolean;
  reverse?: boolean;
  ariaLabel?: string;
  onToggle: () => void;
}

type TableOfContentsProps = {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

type ToasterProps = {
  toasts: {
    id: string;
    variant: 'success' | 'danger';
    message: string;
    action?: React.ReactNode;
  }[];
  removeToast: (id: string) => void;
}

type ToastProps = {
  className?: string;
  variant: 'success' | 'danger';
  icon?: boolean;
  onClose?: () => void;
  action?: React.ReactNode;
  children: React.ReactNode;
}

type SelectOptionType = Omit<OptionProps, 'selected'>;
type SelectProps = Omit<InputProps, 'onSelect' | 'value'> &
    Pick<DropdownWrapperProps, 'minHeight' | 'minWidth' | 'maxWidth'> & {
  options: SelectOptionType[];
  value?: string;
  emptyState?: React.ReactNode;
  onSelect?: (value: string) => void;
  floatingPlacement?: Placement;
  searchable?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

type OptionProps = {
  label: React.ReactNode;
  href?: string;
  value: string;
  hasPrefix?: React.ReactNode;
  hasSuffix?: React.ReactNode;
  description?: React.ReactNode;
  danger?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  tabIndex?: number;
  onClick?: (value: string) => void;
}

export type { 
  InputProps,
  BackgroundProps,
  CardProps,
  CommonProps,
  ConditionalProps,
  DisplayProps,
  FlexProps,
  LogoCloudProps,
  PasswordInputProps,
  StyleProps,
  TiltFxProps,
  ThemeSwitchProps,
  TextProps,
  SizeProps,
  SpacingProps,
  LineProps,
  MaskProps,
  GradientProps,
  DotsProps,
  LinesProps,
  HoloFxProps,
  GridProps,
  MetaProps,
  SmartImageProps,
  MenuLink,
  MenuSection,
  MenuGroup,
  MegaMenuProps,
  DropdownWrapperProps,
  DateRange,
  DateRangePickerProps,
  DatePickerProps,
  SchemaProps,
  SmartLinkProps,
  ButtonProps,
  AnchorButtonProps,
  IconButtonProps,
  AnchorIconButtonProps,
  ToggleButtonProps,
  GlitchFxProps,
  MaskOptions,
  NavIconProps,
  NumberInputProps,
  RadioButtonProps,
  InteractiveDetailsProps,
  RouteGuardProps,
  SkeletonProps,
  SpinnerProps,
  StyleOverlayProps,
  SwitchProps,
  TableOfContentsProps,
  ToasterProps,
  ToastProps,
  SelectProps,
  OptionProps,
};