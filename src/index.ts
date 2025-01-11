import {
    Page,
    HTTPRequest,
    ResourceType,
    DEFAULT_INTERCEPT_RESOLUTION_PRIORITY,
} from "puppeteer"
import { PuppeteerExtraPlugin } from "puppeteer-extra-plugin"

export type BlockResourcesType = Omit<
    ResourceType,
    "signedexchange" | "ping" | "preflight" | "prefetch"
>
// | "document"
// | "stylesheet"
// | "image"
// | "media"
// | "font"
// | "script"
// | "texttrack"
// | "xhr"
// | "fetch"
// | "eventsource"
// | "websocket"
// | "manifest"
// | "other"

class T2PuppeteerBlockResources extends PuppeteerExtraPlugin {
    private blackResources: Set<BlockResourcesType> = new Set([])

    constructor(opts = {}) {
        super(opts)
    }
    get name() {
        return "block-resources"
    }

    onRequest(request: HTTPRequest) {
        const alreadyHandled = request.isInterceptResolutionHandled?.() ?? true
        if (alreadyHandled) return

        const type = request.resourceType()
        const shouldBlock = this.blackResources.has(type)
        request.abortErrorReason()
        if (shouldBlock) {
            return request.abort(
                "blockedbyclient",
                DEFAULT_INTERCEPT_RESOLUTION_PRIORITY
            )
        }
        const continueArgOverrides = request.continueRequestOverrides()
        return request.continue(
            continueArgOverrides,
            DEFAULT_INTERCEPT_RESOLUTION_PRIORITY
        )
    }

    async onPageCreated(page: Page): Promise<void> {
        await page.setRequestInterception(true)
        page.on("request", this.onRequest.bind(this))
    }

    add(resources: BlockResourcesType[]) {
        resources.forEach(resource => {
            this.blackResources.add(resource)
        })
    }

    remove(resources: BlockResourcesType[]) {
        resources.forEach(resource => {
            this.blackResources.delete(resource)
        })
    }
    reset() {
        this.blackResources = new Set([])
    }
}

export default function blockResources(
    opts?: Record<string, any>
): T2PuppeteerBlockResources {
    return new T2PuppeteerBlockResources(opts)
}
