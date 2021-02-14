export class Utils {

    static applyCustomeTheme(primaryColor: string) {
        Utils.applyThemeForClass("bg-dark", "background-color", primaryColor)
        Utils.applyThemeForClass("nav-link", 'color', primaryColor)
        Utils.applyThemeForClass("logo", 'border', `2px solid ${primaryColor}`)
        Utils.applyThemeForClass("details", 'color', primaryColor)
        Utils.applyThemeForClass("footer-header", 'color', primaryColor)
        Utils.applyThemeForClass("page-header", 'color', primaryColor)
        Utils.applyThemeForClass("body", 'background', `linear-gradient(0deg, #ffffff 70%, ${primaryColor}98 100%)`)
        Utils.applyThemeForClass("body", 'background-repeat', `no-repeat`)
        Utils.applyThemeForClass("footer", 'background', `linear-gradient(0deg, ${primaryColor}98 28%, #ffffff 93%)`)
        Utils.applyThemeForClass("footer", 'background-repeat', `no-repeat`)
    }

    static applyThemeForClass(className: string, style: string, primaryColor: string) {
        var elements = document.getElementsByClassName(className)
        console.log(elements.length)
        for(let n =0; n <  elements.length; n++) {
            var item: HTMLElement =  elements.item(n) as HTMLElement
            item.style.setProperty(style, primaryColor, "important")
            console.log(item.style.cssText)
        }
    }
}