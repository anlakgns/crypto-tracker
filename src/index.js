import React from 'react'
import ReactDOM from "react-dom"
import App from "./App"

ReactDOM.render(<App />, document.querySelector('#root'));



//----- Genel Notlar ----//: 

// Grid :  grid sisteminde sadece containerlar justify & alignitems & direction problarını alabilir.

// Container vs Item Container : They're technically the same in terms of the properties being applied, however, the 'container' prop causes that element to take up 100% of the width available to it. That's useful in some cases, but in other cases it can cause you to then not be able to align the items next to each other because they're all just taking up 100% width. So that's when you wrap the <Grid container> with the <Grid item> and then the container will only take up 100% width of that item, not the parent, and so you can then use the parent to align that <Grid item> normally

// Typography: align probu ile texti sağa veya sola getirebiliyoruz.

// Resim : Eğer resim çok dağılıyorsa resizelarda maxwidth ve minwidth kullanışlı olabilir.

// Responsive: useMediaQuery ve ternary ile responsive css çok rahat yazılıyor. Ayrıca [theme.breakpoints.down('sm)] kullanarak da repsonsive css yazılabiliyor.

// Itemları sağa ve sola ayırmak için justify mantıklı olabilir fakat, responsive gerektiği durumlarda auto-layout (sm, md) daha kullanışlı olabiliyor.

// Route yaparken component koyduğumuz zaman props koyamıyoruz. Koymak istersek render propsu kullanmak zorundayız component yerine 77. videonun sonunda anlatımı mevcut.

//IconButton , button ile aynı fakat resimler için customize edilmiş hali.