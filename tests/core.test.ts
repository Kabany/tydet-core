import { Service } from "../src/service.core"
import { Context } from "../src/context.core"
import { CoreError } from "../src/error.core"

class ExtendedService extends Service {
  private STATUS = "STATUS"
  constructor(params: Map<string, any>) {
    super(params)
    this.params.set(this.STATUS, "constructor")
  }
  async beforeMount(context: Context) {
    this.params.set(this.STATUS, "beforeMount")
    await super.beforeMount(context)
  }
  async onMount() {
    this.params.set(this.STATUS, "onMount")
  }
  async beforeUnmount() {
    this.params.set(this.STATUS, "beforeUnmount")
  }
  async onUnmount() {
    this.params.set(this.STATUS, "onUnmount")
  }
  public getStatus() {
    return this.params.get(this.STATUS) as string
  }
}

describe("Context and Service", () => {
  it("should create app and handle service events", async () => {
    let app = new Context()
    let service = new ExtendedService(new Map())
    await app.mountService("service", service)
    expect(service.getStatus()).toBe("onMount")
    await app.unmountServices()
    expect(service.getStatus()).toBe("onUnmount")
  })
  it("should throw an error", async () => {
    let app = new Context()
    try {
      app.getService("service")
    } catch(err) {
      expect(err.name).toBe("CoreError")
      expect(err.message).toBe("No service found with the name: service")
    }
  })
})