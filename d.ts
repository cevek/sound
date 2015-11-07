export function d(tag:string | HTMLElement, attrs?:any, ...children:any[]):HTMLElement {
    var dom = tag instanceof HTMLElement ? tag : document.createElement(<string>tag);
    if (attrs) {
        for (var attr in attrs) {
            (<any>dom)[attr] = attrs[attr];
        }
    }
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        child = child instanceof Node ? child : document.createTextNode(child);
        dom.appendChild(child);
    }
    return dom;
}
