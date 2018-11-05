declare module '*.md' {
  interface MarkdownContent {
    title?: string;
    html: string;
  }

  const content: MarkdownContent;

  export default content;
}
