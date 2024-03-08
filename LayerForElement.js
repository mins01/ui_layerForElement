class LayerForElement{
    static instances = [];


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
    



    wrap = null;
    target = null;
    lastShownTarget = null;

    defLfePos = "top";
    defLfePosSide = "out";

    constructor(wrap=null,target=null){
        this.wrap = wrap
        this.target = target
        this.lastShownTarget = null;
        this.defLfePos = "top";
        this.defLfePosSide = "out";

        this.constructor.instances.push(this)
    }

    get container(){
        const continer = document.querySelector('.lfe-container');
        if(!continer){throw new Error('.lfe-container is not exists') }
        return continer;
    }
    get isShow(){
        if(!this.wrap){throw new Error('wrap is not exists') }
        return this.wrap.classList.contains('on');
    }
    show(target=null){
        if(target){ this.target = target; this.syncPos();}

        if(this.lastShownTarget == this.target){
            return false;
        }else if(this.isShow){
            this.wrap.classList.remove('on');
            this.lastShownTarget = null;
        }else{

        }        
        setTimeout(() => {
            this.wrap.classList.add('on');
            this.lastShownTarget = this.target;
            if(this.onshow instanceof Function) this.onshow(this);
        }, 10);
    }
    onshow(lfe){
    }
    hide(){
        this.wrap.classList.remove('on');
        this.lastShownTarget = null;
        if(this.onhide instanceof Function) this.onhide(this);
    }
    onhide(lfe){
    }
    toggle(target=null){
        if(target){ this.target = target; this.syncPos();}
        if(this.lastShownTarget === this.target){
            this.wrap.classList.toggle('on');
            if(this.toggle instanceof Function) this.ontoggle(this);
        }else {
            this.show(target);
        }
        
    }
    ontoggle(lfe){
    }
    syncPos(){
        if(!this.target) return false;
        let rectContainer = this.container.getBoundingClientRect();
        let rectTarget = this.target.getBoundingClientRect();
        

        this.wrap.dataset.lfePos = this.target.dataset.lfePos??this.defLfePos;
        this.wrap.dataset.lfePosSide = this.target.dataset.lfePosSide??this.defLfePosSide;
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