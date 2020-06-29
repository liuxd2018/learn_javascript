class PopUpInfo extends HTMLElement {
    constructor() {
        // always call super first in constructor
        super();

        let shadow = this.attachShadow({mode: 'open'})

        let wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');
        
        let icon = document.createElement('span');
        icon.setAttribute('class', 'icon')
        icon.setAttribute('tabindex', 0)

        let info = document.createElement('span')
        info.setAttribute('class', 'info')


    }
}