/** 功能入口信息。 */
export interface FeatureEntry {
  /** 文字 */
  label: string;
  /** 图标。 */
  icon: Component;
  /** 功能链接。 */
  link: string;
}

declare module '#app' {
  interface PageMeta {
    /** 页面标题。 */
    title?: string;
  }
};

declare module 'nuxt/schema' {
  interface AppConfig {
    /** 首页功能入口。 */
    featureEntries: Record<string, FeatureEntry[]>;
  }
  interface AppConfigInput {
    [K: keyof AppConfig]: AppConfig[K];
  }
};

export {};
