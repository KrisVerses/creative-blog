# Implementation Details

## Search Functionality

### Text Highlighting
The search highlighting system uses a combination of regex pattern matching and React components to provide consistent text highlighting across the application:

```typescript
function highlightText(text: string, searchTerm: string) {
    if (!searchTerm.trim()) return text;

    // Escape special regex characters for safety
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create case-insensitive regex pattern
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => {
        if (part.toLowerCase() === searchTerm.toLowerCase() || regex.test(part)) {
            return <mark key={i} className="bg-[#FF6F61]/10 text-[#FF6F61] px-1 rounded">{part}</mark>;
        }
        return part;
    });
}
```

Key features:
- Case-insensitive matching
- Special character handling
- Consistent styling with theme colors
- Proper React key management
- Safe text splitting and joining

### Component Integration
The highlighting system is integrated into various components:

1. **MasonryGrid**
```typescript
<span className="relative z-10">
    {searchQuery.trim() ? highlightText(content.title, searchQuery) : content.title}
</span>
```

2. **Category Pages**
```typescript
<div className="search-results">
    {filteredContent.map(content => (
        <MasonryGrid 
            items={content} 
            category={category} 
            searchQuery={searchQuery} 
        />
    ))}
</div>
```

### Search Implementation Details
- Client-side search for instant results
- Proper handling of undefined content
- Maintained hover effects alongside highlighting
- Consistent styling across components
- Type-safe implementation

### Edge Cases Handled
1. Special characters in search terms
2. Empty or whitespace-only searches
3. Case sensitivity
4. Undefined or null content
5. Multiple matches in single text 