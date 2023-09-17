/** 功能入口信息。 */
export interface FeatureEntry {
  /** 文字 */
  label: string;
  /** 图标。 */
  icon: Component;
  /** 功能链接。 */
  link: string;
}

/** 更新类型。 */
export type ChangeType = 'feat' | 'fix' | 'style' | 'refactor' | 'pref' | 'test' | 'revert' | 'chore' | 'ci';
/** 更新记录。 */
export interface ChangeLogRecord {
  /** 作者昵称。 */
  author: string;
  /** 更新时间。 */
  date: string;
  /** 更新类型。 */
  type: ChangeType;
  /** 更新内容。 */
  content: string;
  /** 链接。 */
  url?: string;
}

declare module '#app' {
  interface PageMeta {
    /** 页面标题。 */
    title?: string;
  }
};

declare module 'nuxt/schema' {
  interface AppConfig {
    /** 版本号。 */
    version: string;
    /** 更新记录。 */
    changelog: ChangeLogRecord[];
    /** 首页功能入口。 */
    featureEntries: Record<string, FeatureEntry[]>;
  }
  interface AppConfigInput {
    [K: keyof AppConfig]: AppConfig[K];
  }
};

export {};
