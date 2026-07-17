const fs = require('fs')
const path = require('path')

const targetFile = 'codebase_context.md'
const rootDir = __dirname

const ignoreDirs = ['node_modules', '.git', 'public', 'screenshots', '.tempmediaStorage', 'brain']
const validExts = ['.js', '.jsx', '.ts', '.tsx', '.json', '.env.example', '.md', '.css', '.html']

let contextContent = `# Library Management System - Codebase Context\n\nThis file contains the full structure and source code of the MERN-stack Library Management System.\n\n`

function getTree(dir, prefix = '') {
    let tree = ''
    const files = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1
        if (!a.isDirectory() && b.isDirectory()) return 1
        return a.name.localeCompare(b.name)
    })

    files.forEach((file, index) => {
        if (ignoreDirs.includes(file.name)) return
        
        const isLast = index === files.length - 1
        tree += `${prefix}${isLast ? '└── ' : '├── '}${file.name}\n`
        
        if (file.isDirectory()) {
            tree += getTree(path.join(dir, file.name), prefix + (isLast ? '    ' : '│   '))
        }
    })
    return tree
}

contextContent += `## Directory Structure\n\n\`\`\`text\n${getTree(rootDir)}\`\`\`\n\n## Source Code\n\n`

function walkDir(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true })
    for (const file of files) {
        if (ignoreDirs.includes(file.name)) continue
        if (file.name === 'package-lock.json' || file.name === targetFile || file.name === 'generateContext.cjs') continue
        
        const fullPath = path.join(dir, file.name)
        if (file.isDirectory()) {
            walkDir(fullPath)
        } else {
            const ext = path.extname(file.name)
            if (validExts.includes(ext) || file.name === '.env.example') {
                try {
                    const content = fs.readFileSync(fullPath, 'utf8')
                    const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/')
                    
                    const mdLang = ext === '.js' || ext === '.jsx' ? 'javascript' :
                                   ext === '.ts' || ext === '.tsx' ? 'typescript' :
                                   ext === '.css' ? 'css' :
                                   ext === '.json' ? 'json' :
                                   ext === '.html' ? 'html' : 'text'

                    contextContent += `### File: \`${relPath}\`\n\n\`\`\`${mdLang}\n${content}\n\`\`\`\n\n`
                } catch (e) {
                    console.error(`Failed to read ${fullPath}`, e)
                }
            }
        }
    }
}

walkDir(rootDir)

fs.writeFileSync(path.join(rootDir, targetFile), contextContent)
console.log('Successfully generated codebase_context.md')
