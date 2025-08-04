import { Node } from '@tiptap/core';
import Link from '@tiptap/extension-link';
// Custom paragraph extension just for quotes
const QuoteParagraph = Node.create({
  name: 'quoteText',
  group: 'block',
  content: 'text*',
  parseHTML() {
    return [{ tag: 'p.quote-text' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['p', { class: 'quote-text' }, 0];
  },
  addOptions() {
    return {
      HTMLAttributes: {
        class: 'quote-text',
      },
    };
  },
});

const QuoteAuthor = Node.create({
  name: 'quoteAuthor',
  group: 'block',
  content: 'text*',
  parseHTML() {
    return [{ tag: 'span.quote-author' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', { class: 'quote-author' }, 0];
  },
  addOptions() {
    return {
      HTMLAttributes: {
        class: 'quote-author',
      },
    };
  },
});


const CustomLink = Link.extend({
  inclusive: false,
  addAttributes() {
    return {
      href: {
        default: null,
      },
      target: {
        default: '_blank',
      },
      rel: {
        default: 'noopener noreferrer',
      },
    };
  },
});

// Custom List Item Node with direct text content
const CustomListItem = Node.create({
  name: 'customListItem',
  content: 'text*', // Allows direct text content
  defining: true,
  parseHTML() {
    return [{ tag: 'li' }];
  },
  renderHTML() {
    return ['li', 0];
  },
});

// Truths List Node
const TruthsList = Node.create({
  name: 'truthsList',
  group: 'block',
  content: 'customListItem+',
  parseHTML() {
    return [{ tag: 'ul.truths' }];
  },
  renderHTML() {
    return ['ul', { class: 'truths' }, 0];
  },
  addCommands() {
    return {
      toggleTruthsList: () => ({ commands }) => {
        return commands.toggleList('truthsList', 'customListItem');
      },
    };
  },
});

// Lies List Node
const LiesList = Node.create({
  name: 'liesList',
  group: 'block',
  content: 'customListItem+',
  parseHTML() {
    return [{ tag: 'ul.lies' }];
  },
  renderHTML() {
    return ['ul', { class: 'lies' }, 0];
  },
  addCommands() {
    return {
      toggleLiesList: () => ({ commands }) => {
        return commands.toggleList('liesList', 'customListItem');
      },
    };
  },
});
// Comparison Node
const Comparison = Node.create({
  name: 'comparison',
  group: 'block',
  content: '(liesList truthsList)',
  parseHTML() {
    return [{
      tag: 'div.comparison',
      getContent: (node, schema) => {
        const liesUl = node.querySelector('ul.lies');
        const truthsUl = node.querySelector('ul.truths');

        const content = [];

        if (liesUl) {
          const liesListNode = schema.nodes.liesList.create({}, 
            Array.from(liesUl.querySelectorAll('li')).map(li =>
              schema.nodes.customListItem.create({}, schema.text(li.textContent))
            )
          );
          content.push(liesListNode);
        }

        if (truthsUl) {
          const truthsListNode = schema.nodes.truthsList.create({}, 
            Array.from(truthsUl.querySelectorAll('li')).map(li =>
              schema.nodes.customListItem.create({}, schema.text(li.textContent))
            )
          );
          content.push(truthsListNode);
        }

        return content;
      }
    }];
  },
  renderHTML() {
    return ['div', { class: 'comparison' }, 0];
  },
  addCommands() {
    return {
      setComparison: () => ({ chain }) => {
        return chain()
          .insertContent({
            type: 'comparison',
            content: [
              {
                type: 'liesList',
                content: [
                  {
                    type: 'customListItem',
                    content: [
                      {
                        type: 'text',
                        text: 'List item',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'truthsList',
                content: [
                  {
                    type: 'customListItem',
                    content: [
                      {
                        type: 'text',
                        text: 'List item',
                      },
                    ],
                  },
                ],
              },
            ],
          })
          .run();
      },
    };
  },
});

export {QuoteParagraph, QuoteAuthor, CustomLink, CustomListItem, TruthsList, LiesList, Comparison}