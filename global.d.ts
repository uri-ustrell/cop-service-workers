// We need to tell TypeScript that when we write "import styles from './styles.scss' we mean to load a module (to look for a './styles.scss.d.ts').
declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export = content;
}

declare module "fukku/*" {
  const content: React.ComponentType;
  export = content;
}

declare module "kiritakiForm/*" {
  const content: any;
  export = content;
}

declare module "@mng/*" {
  const content: any;
  export = content;
}

interface Window {
  verne: any;
  dataLayerV2Json: any;
  mswError: any;
  gtag: any;
  appUrl: string;
}

namespace JSX {
  interface IntrinsicElements {
    "micro-frontend": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
