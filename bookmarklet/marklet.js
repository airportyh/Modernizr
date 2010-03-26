function go(){
    var features = [
        'borderimage',
        'borderradius',
        'boxshadow',
        'cssanimations',
        'csscolumns',
        'cssgradients',
        'cssreflections',
        'csstransforms',
        'csstransforms3d',
        'csstransitions',
        'flash',
        'fontface',
        'hsla',
        'multiplebgs',
        'opacity',
        'rgba'
    ]
    var profiles = {}
    profiles['IE'] = [
        false, false, false, false, false, 
        false, false, false, false, false, 
        false, true, false, false, false, false
    ]
    profiles['Opera'] = [
        false, false, false, false, false, 
        false, false, false, false, false, 
        false, true, true, false, true, true
    ]
    profiles['Firefox 2'] = [
        false, true, false, false, true, 
        false, false, false, false, false, 
        false, false, false, false, true, false
    ]
    profiles['Firefox 3.5'] = [
        true, true, true, false, true, 
        false, false, true, false, false, 
        true, false, false, false, true, true
    ]
    profiles['Safari 4'] = [
        true, true, true, true, true, 
        true, true, true, true, true, 
        false, true, true, true, true, true
    ]
    profiles['Chrome'] = [
        true, true, true, true, true, 
        true, true, true, false, true, 
        false, true, true, true, true, true
    ]
    function keys(obj){
        var ret = []
        for (var key in obj)
            if (obj.hasOwnProperty(key))
                ret.push(key)
        return ret
    }
    function render(){
        var classes = []
        for (var i = 0; i < features.length; i++ ){
            var feature = features[i]
            classes.push( (  !Modernizr[ feature ] ? 'no-' : '' ) + feature )
        }
        document.documentElement.className = classes.join(' ')
    }
    function onProfileChanged(){
        var profile = profiles[selectBox.value]
        for (var i = 0; i < profile.length; i++){
            var cb = checkBoxes[i]
            var feat = features[i]
            cb.checked = Modernizr[feat] = profile[i]
            
        }
        render()
    }
    
    if (!window.Modernizr) alert('Modernizr not found. Please include the library on this page before using this bookmarklet.')
    function onCBChange(e){
        var elm = e.srcElement
        var feat = elm.name
        Modernizr[feat] = elm.checked
        render()
    }
    var frame = document.createElement('div')
    
    closeB = document.createElement('button')
    closeB.innerHTML = 'x'
    with(closeB.style){
        right = '8px'
        position = 'absolute'
        padding = '2px 2px'
    }
    closeB.addEventListener('click', function(){
        document.body.removeChild(frame)
    }, false)
    frame.appendChild(closeB)
    
    
    var header = document.createElement('h1')
    with(header.style){
        padding = 0
        margin = 0
        fontSize = '125%'
    }
    header.innerHTML = 'Modernizr Bookmarklet'
    frame.appendChild(header)
    var selectBox = document.createElement('select')
    var opt = document.createElement('option')
    opt.innerHTML = '(none)'
    selectBox.appendChild(opt)
    for (var profile in profiles){
        opt = document.createElement('option')
        opt.innerHTML = profile
        selectBox.appendChild(opt)
    }
    selectBox.addEventListener('change', onProfileChanged, false)
    frame.appendChild(selectBox)
    
    var ul = document.createElement('ul')
    with(frame.style){
        padding = '1em'
        position = 'fixed'
        bottom = '10px'
        right = '10px'
        backgroundColor = 'rgba(255, 255, 255, 0.6)'
        WebkitBorderRadius = '5px'
        MozBorderRadius = '5px'
        borderRadius = '5px'
        maxHeight = '600px'
        width = '14em'
        fontSize = '75%'
    }
    with(ul.style){
        margin = '0'
        padding = '0'
        listStyle = 'none'
        overflowY = 'auto'
        height = '400px'
    }
    var checkBoxes = []
    for (var i = 0; i < features.length; i++){
        var feat = features[i]
        if (feat == 'addTest') continue
        var li = document.createElement('li')
        var cb = document.createElement('input')
        checkBoxes.push(cb)
        cb.type = 'checkbox'
        cb.name = feat
        cb.checked = Modernizr[feat]
        cb.addEventListener('change', onCBChange, false)
        var label = document.createElement('label')
        label.innerHTML = feat
        if (!Modernizr[feat]){
            label.style.color = '#666'
            cb.disabled = 'disabled'
        }
        li.appendChild(cb)
        li.appendChild(label)
        ul.appendChild(li)
    }
    frame.appendChild(ul)
    document.body.appendChild(frame)
}