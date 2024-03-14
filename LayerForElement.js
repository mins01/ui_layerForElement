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
        
        let lfe = this.searchFromElement(element);
        if(lfe) lfe.hide();
        else{
            let wrap = element.closest('.lfe-wrap');
            if(!wrap) return false;
            wrap.classList.remove('on');
        }
    }
    static searchFromElement(element){
        let wrap = element.closest('.lfe-wrap');
        if(!wrap) return null;
        for(let i=0,m=this.instances.length;i<m;i++){
            const lfe = this.instances[i];
            if(!lfe) continue;
            if(lfe.wrap === wrap ){
                // console.log('wrap 찾음',lfe);
                return lfe;
            }
        }
        return false;
    }
    static autoSync(){
        window.addEventListener('resize',(event)=>{
            this.syncPosAll();
        })
        window.addEventListener('scroll',(event)=>{
            this.syncPosAll();
        })
    }
    



    wrap = null;
    target = null;
    lastShownTarget = null;

    defLfeWrap = "top";
    defLfeWrapSide = "out";

    constructor(wrap=null,target=null){
        this.wrap = wrap
        this.target = target
        this.lastShownTarget = null;
        this.defLfeWrap = "top";
        this.defLfeWrapSide = "out";
        this.deflfeWrapCaged = "false";
        

        this.constructor.instances.push(this)

        //모션이 있을 경우 크기등이 틀어질 경우 대비
        this.wrap.addEventListener('transitionstart',(event)=>{
            this.syncPos();
        })
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
        this.lastShownTarget = this.target;     

        setTimeout(() => {
            console.log('on');  
            this.wrap.classList.add('on');
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
        if(target){ this.target = target; }
        if(this.lastShownTarget === this.target){
            this.syncPos();
            setTimeout(() => {
                this.wrap.classList.toggle('on');
                if(this.toggle instanceof Function) this.ontoggle(this);
            }, 10);

        }else {
            this.show(target);
        }
        
    }
    ontoggle(lfe){
    }
    syncPos(){
        if(!this.target) return false;
        // let rectContainer = this.container.getBoundingClientRect();
        let rectTarget = this.target.getBoundingClientRect();
        let rectWrap = this.wrap.getBoundingClientRect();
        console.log('rectTarget',rectTarget);
        console.log('rectWrap',rectWrap);

        const wrapFixed = this.wrap.classList.contains('lef-wrap-fixed');

        this.wrap.dataset.lfeWrap = this.target.dataset.lfeWrap??this.defLfeWrap;
        this.wrap.dataset.lfeWrapSide = this.target.dataset.lfeWrapSide??this.defLfeWrapSide;
        if(this.target.dataset.lfeWrapCaged !== undefined){
            this.wrap.dataset.lfeWrapCaged = this.target.dataset.lfeWrapCaged??this.deflfeWrapCaged;
        }else{
            delete this.wrap.dataset.lfeWrapCaged;
        }
        
        this.wrap.style.setProperty('--target-top',rectTarget.top+'px')
        this.wrap.style.setProperty('--target-left',rectTarget.left+'px')
        this.wrap.style.setProperty('--target-width',rectTarget.width+'px')
        this.wrap.style.setProperty('--target-height',rectTarget.height+'px')

        // this.wrap.style.setProperty('--wrap-top',rectWrap.top+'px') //자동 계산
        // this.wrap.style.setProperty('--wrap-left',rectWrap.left+'px') //자동 계산
        this.wrap.style.setProperty('--wrap-width',rectWrap.width+'px')
        this.wrap.style.setProperty('--wrap-height',rectWrap.height+'px')
    }
}