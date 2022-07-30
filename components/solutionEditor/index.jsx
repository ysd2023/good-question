import React, { useState, useEffect } from 'react'
import { DomEditor } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

function SolutionEditorComponent(props) {
    // editor 实例
    const [editor, setEditor] = useState(null)                

    // 编辑器内容
    const [html, setHtml] = useState('')

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setTimeout(() => {
            setHtml('')
        }, 1500)
    }, [])

    // 工具栏配置 
    const toolbarConfig = { 
        toolbarKeys: [
            'headerSelect',
            'blockquote',
            "bulletedList",
            "numberedList",
            "emotion",
            "insertLink",
            "codeBlock",
            "divider"
        ]
    }  

    // 编辑器配置
    const editorConfig = {                       
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        if(editor) {
            const toolbar = DomEditor.getToolbar(editor)
            const curToolbarConfig = toolbar.getConfig()
            console.log( curToolbarConfig.toolbarKeys ) // 当前菜单排序和分组
        }
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <div style={{ border: '1px solid #ccc', zIndex: 100}}>
            <div>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
            </div>
            <div>
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
        </div>
    )
}

export default SolutionEditorComponent