/** A DOM element's attribute as an object. In most DOM methods, you will probably directly retrieve the attribute as a string (e.g., Element.getAttribute(), but certain functions (e.g., Element.getAttributeNode()) or means of iterating give Attr types. */
interface Attr extends Node {
    readonly localName: string;
    readonly name: string;
    readonly namespaceURI: string | null;
    readonly ownerDocument: Document;
    readonly ownerElement: Element | null;
    readonly prefix: string | null;
    readonly specified: boolean;
    value: string;
}

declare var Attr: {
    prototype: Attr;
    new(): Attr;
};

/** A CDATA section that can be used within XML to include extended portions of unescaped text. The symbols < and & don’t need escaping as they normally do when inside a CDATA section. */
interface CDATASection extends Text {
}

declare var CDATASection: {
    prototype: CDATASection;
    new(): CDATASection;
};

interface ChildNode extends Node {
    /**
     * Inserts nodes just after node, while replacing strings in nodes with equivalent Text nodes.
     * 
     * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
     */
    after(...nodes: (Node | string)[]): void;
    /**
     * Inserts nodes just before node, while replacing strings in nodes with equivalent Text nodes.
     * 
     * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
     */
    before(...nodes: (Node | string)[]): void;
    /**
     * Removes node.
     */
    remove(): void;
    /**
     * Replaces node with nodes, while replacing strings in nodes with equivalent Text nodes.
     * 
     * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
     */
    replaceWith(...nodes: (Node | string)[]): void;
}

/** Textual notations within markup; although it is generally not visually shown, such comments are available to be read in the source view. */
interface Comment extends CharacterData {
}

declare var Comment: {
    prototype: Comment;
    new(data?: string): Comment;
};

