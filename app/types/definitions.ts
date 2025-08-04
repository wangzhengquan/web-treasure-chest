
export type Breadcrumb = {
  label: string;
  href?: string;
  active?: boolean;
};

export type NavNode = {
  label: string;
  href?: string;
  icon?: React.JSXElementConstructor<any>;
  children?: (NavNode | NavLeaf)[]
};

export type NavLeaf = {
  label: string;
  href: string;
  icon: React.JSXElementConstructor<any>;
};

export interface IconProps {
  className?: string;
}
