export function markdownToHtml(markdown: string): string {
  let html = markdown
    // First, convert headers
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    
    // Convert bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // Convert italic text
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Convert list items
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    
  // Split into lines and process paragraphs
  const lines = html.split('\n');
  const processedLines = [];
  let inList = false;
  let listType = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line === '') {
      processedLines.push('');
      continue;
    }
    
    // Check if it's a header
    if (line.startsWith('<h')) {
      if (inList) {
        processedLines.push(`</${listType}>`);
        inList = false;
      }
      processedLines.push(line);
      continue;
    }
    
    // Check if it's a list item
    if (line.startsWith('<li>')) {
      if (!inList) {
        // Determine list type based on original content
        const originalLine = markdown.split('\n')[i];
        listType = originalLine.match(/^\d+\./) ? 'ol' : 'ul';
        processedLines.push(`<${listType}>`);
        inList = true;
      }
      processedLines.push(line);
      continue;
    }
    
    // If we were in a list and now we're not, close it
    if (inList) {
      processedLines.push(`</${listType}>`);
      inList = false;
    }
    
    // Regular paragraph
    if (line) {
      processedLines.push(`<p>${line}</p>`);
    }
  }
  
  // Close any remaining list
  if (inList) {
    processedLines.push(`</${listType}>`);
  }
  
  return processedLines.join('\n').trim();
} 