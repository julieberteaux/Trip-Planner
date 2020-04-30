import React, { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import isUrl from 'is-url';
import { createEditor, Editor, Transforms, Range } from 'slate';
import { Slate, Editable, useSlate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { MDBIcon, MDBContainer, MDBCardBody, MDBCard } from 'mdbreact';
import { Toolbar } from './NotesComponents';

const Notes = (props) => {
  const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
  };

  const onClickLink = (url) => {
    window.open(url, '_blank');
  };

  const initialValue = [
    { type: 'heading-one', children: [{ text: 'Hi there !' }] },
    {
      type: 'paragraph',
      children: [
        { text: 'In this ' },
        { text: 'section', bold: true },
        { text: ' you can add ' },
        { text: 'every', underline: true },
        { text: ' notes you want about ' },
        { text: 'your trip', italic: true },
        { text: ' !' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        { text: 'It can be link for your ' },
        {
          type: 'link',
          url:
            'https://www.booking.com/index.en-gb.html?aid=397594;label=gog235jc-1DCAEoggI46AdIM1gDaE2IAQGYAQm4AQfIAQzYAQPoAQGIAgGoAgO4AtmbofUFwAIB;sid=89e19ecff6d197deb705c2f8cf6e2ce0;keep_landing=1&sb_price_type=total&',
          children: [{ text: 'booking ' }],
        },
        { text: 'hotel.' },
      ],
    },
    {
      type: 'bulleted-list',
      children: [
        { type: 'list-item', children: [{ text: 'list of site you want to visit' }] },
        { type: 'list-item', children: [{ text: 'or restaurant' }] },
      ],
    },
    {
      type: 'numbered-list',
      children: [
        { type: 'list-item', children: [{ text: 'Or you itinerary' }] },
        { type: 'list-item', children: [{ text: 'day ' }] },
        { type: 'list-item', children: [{ text: 'by ' }] },
        { type: 'list-item', children: [{ text: 'day' }] },
      ],
    },
    { type: 'block-quote', children: [{ text: 'Enjoy' }] },
    { type: 'paragraph', children: [{ text: '' }] },
    { type: 'paragraph', children: [{ text: '' }] },
  ];

  const LIST_TYPES = ['numbered-list', 'bulleted-list'];

  const withLinks = (editor) => {
    const { insertData, insertText, isInline } = editor;

    editor.isInline = (element) => {
      return element.type === 'link' ? true : isInline(element);
    };

    editor.insertText = (text) => {
      if (text && isUrl(text)) {
        wrapLink(editor, text);
      } else {
        insertText(text);
      }
    };

    editor.insertData = (data) => {
      const text = data.getData('text/plain');

      if (text && isUrl(text)) {
        wrapLink(editor, text);
      } else {
        insertData(data);
      }
    };

    return editor;
  };

  const insertLink = (editor, url) => {
    if (editor.selection) {
      wrapLink(editor, url);
    }
  };

  const isLinkActive = (editor) => {
    const [link] = Editor.nodes(editor, { match: (n) => n.type === 'link' });
    return !!link;
  };

  const unwrapLink = (editor) => {
    Transforms.unwrapNodes(editor, { match: (n) => n.type === 'link' });
  };

  const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
      unwrapLink(editor);
    }

    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    const link = {
      type: 'link',
      url,
      children: isCollapsed ? [{ text: url }] : [],
    };

    if (isCollapsed) {
      Transforms.insertNodes(editor, link);
    } else {
      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: 'end' });
    }
  };

  const LinkButton = () => {
    const editor = useSlate();
    return (
      <button
        className="unstyled-button"
        active={isLinkActive(editor)}
        onMouseDown={(event) => {
          event.preventDefault();
          const url = window.prompt('Enter the URL of the link:');
          if (!url) return;
          insertLink(editor, url);
        }}
      >
        <MDBIcon icon="link" />
      </button>
    );
  };

  const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) => LIST_TYPES.includes(n.type),
      split: true,
    });

    Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    });

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === format,
    });

    return !!match;
  };

  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const Element = ({ attributes, children, element }) => {
    switch (element.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      case 'link':
        return (
          <a {...attributes} onClick={() => onClickLink(element.url)} href={element.url}>
            {children}
          </a>
        );
      default:
        return <p {...attributes}>{children}</p>;
    }
  };

  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (leaf.code) {
      children = <code>{children}</code>;
    }

    if (leaf.italic) {
      children = <em>{children}</em>;
    }

    if (leaf.underline) {
      children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
  };

  const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
      <button
        className="unstyled-button"
        active={isBlockActive(editor, format)}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
      >
        <MDBIcon icon={icon} />
      </button>
    );
  };

  const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
      <button
        className="unstyled-button"
        active={isMarkActive(editor, format)}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
      >
        <MDBIcon icon={icon} />
      </button>
    );
  };

  //|| initialValue

  console.log(props.tripToEdit.notes);
  const [value, setValue] = useState(props.tripToEdit.notes || initialValue);

  console.log(value);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withLinks(withHistory(withReact(createEditor()))), []);

  return (
    <MDBContainer fluid>
      <MDBCard>
        <MDBCardBody color="rgba-white-strong">
          <Slate
            editor={editor}
            value={value}
            onChange={(value) => {
              setValue(value);
              const content = JSON.stringify(value);
              props.updateTripNotes(content);
            }}
          >
            <Toolbar>
              <MarkButton format="bold" icon="bold" />
              <MarkButton format="italic" icon="italic" />
              <MarkButton format="underline" icon="underline" />
              <MarkButton format="code" icon="code" />
              <LinkButton />
              <BlockButton format="heading-one" icon="heading" />
              {/* <BlockButton format="heading-two" icon="looks_two" /> */}
              <BlockButton format="block-quote" icon="quote-right" />
              <BlockButton format="numbered-list" icon="list-ol" />
              <BlockButton format="bulleted-list" icon="list-ul" />
            </Toolbar>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Enter some rich text…"
              spellCheck
              autoFocus
              onKeyDown={(event) => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, event)) {
                    event.preventDefault();
                    const mark = HOTKEYS[hotkey];
                    toggleMark(editor, mark);
                  }
                }
              }}
            />
          </Slate>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Notes;
