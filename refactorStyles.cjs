const fs = require('fs')
const path = require('path')

const featuresDir = path.join(__dirname, 'frontend/src/features')

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f)
        const isDirectory = fs.statSync(dirPath).isDirectory()
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f))
    })
}

const keysToRemove = [
    'page', 'header', 'title', 'subtitle', 'card', 'center', 'stateCenter', 'emptyState', 'modalTitle', 'modalDesc', 'modalActions'
]

walkDir(featuresDir, (filePath) => {
    if (!filePath.endsWith('.tsx')) return
    
    let content = fs.readFileSync(filePath, 'utf8')
    
    // Inject import if not present
    if (content.includes('const styles: Record<string, React.CSSProperties> = {') && !content.includes("from '../../styles/shared'")) {
        // Find last import
        const lines = content.split('\n')
        let lastImportIdx = -1
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('import ')) lastImportIdx = i
        }
        if (lastImportIdx !== -1) {
            lines.splice(lastImportIdx + 1, 0, "import { sharedStyles } from '../../styles/shared'")
            content = lines.join('\n')
        }
    }
    
    // Inject ...sharedStyles
    if (content.includes('const styles: Record<string, React.CSSProperties> = {') && !content.includes('...sharedStyles,')) {
        content = content.replace('const styles: Record<string, React.CSSProperties> = {', 'const styles: Record<string, React.CSSProperties> = {\n  ...sharedStyles,')
    }
    
    // Remove exact keys. This regex looks for `key: { ... },`
    // Since it's nested braces, a simple regex is hard. Let's just do it manually with a small parser.
    let inStyles = false
    let depth = 0
    let currentKey = ''
    let newContent = ''
    let skip = false
    
    const lines = content.split('\n')
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        
        if (line.includes('const styles: Record<string, React.CSSProperties> = {')) {
            inStyles = true
            newContent += line + '\n'
            continue
        }
        
        if (inStyles) {
            if (depth === 0) {
                const match = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*\{/)
                if (match) {
                    currentKey = match[1]
                    if (keysToRemove.includes(currentKey)) {
                        skip = true
                    }
                }
            }
            
            if (line.includes('{')) depth += (line.match(/\{/g) || []).length
            if (line.includes('}')) depth -= (line.match(/\}/g) || []).length
            
            if (!skip) {
                newContent += line + '\n'
            }
            
            if (depth === 0 && skip) {
                skip = false // Just finished skipping a block
                continue
            }
            
            if (depth < 0) {
                inStyles = false
            }
        } else {
            newContent += line + '\n'
        }
    }
    
    fs.writeFileSync(filePath, newContent.trim() + '\n')
})
console.log('Finished refactoring styles')
