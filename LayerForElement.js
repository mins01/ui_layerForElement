class LayerForElement{
    static instances = [];
    wrap = null;
    target = null;


    static syncPosAll(){
        this.instances.forEach(lfe => {
            if(lfe) lfe.syncPos();
        });
    }
    static hideAll(){
        this.instances.forEach(lfe => {
            if(lfe) lfe.hide();
        });
    }
    static showAll(){
        this.instances.forEach(lfe => {
            if(lfe) lfe.show();
        });
    }
    static toggleAll(){
        this.instances.forEach(lfe => {
            if(lfe) lfe.toggle();
        });
    }
    static hideFromElement(element){
        let wrap = element.closest('.lfe-wrap');
        if(!wrap) return false;
        wrap.classList.remove('on');
    }
    static autoSync(){
        window.addEventListener('resize',(event)=>{
            this.syncPosAll();
        })
    }
    


    constructor(wrap=null,target=null){
        this.wrap = wrap
        this.target = target
        this.constructor.instances.push(this)
    }

    get container(){
        const continer = document.querySelector('.lfe-container');
        if(!continer){throw new Error('.lfe-container is not exists') }
        return continer;
    }
    show(target=null){
        if(target){ this.target = target; this.syncPos();}
        
        this.wrap.classList.add('on');
    }
    hide(){
        this.wrap.classList.remove('on');
    }
    toggle(target=null){
        if(target){ this.target = target; this.syncPos();}
        this.wrap.classList.toggle('on');
    }
    syncPos(){
        let rectContainer = this.container.getBoundingClientRect();
        let rectTarget = this.target.getBoundingClientRect();
        

        this.wrap.dataset.lfePos = this.target.dataset.lfePos??'top';
        this.wrap.dataset.lfePosSide = this.target.dataset.lfePosSide??'out';
        // let xyTarget = this.getXY(rect,this.wrap.dataset.lfePos)

        let rectWrap = {
            top:rectTarget.top - rectContainer.top,
            left:rectTarget.left - rectContainer.left,
            width:rectTarget.width,
            height:rectTarget.height,
        }
        this.wrap.style.setProperty('--wrap-top',rectWrap.top+'px')
        this.wrap.style.setProperty('--wrap-left',rectWrap.left+'px')
        this.wrap.style.setProperty('--wrap-width',rectWrap.width+'px')
        this.wrap.style.setProperty('--wrap-height',rectWrap.height+'px')
    }
}