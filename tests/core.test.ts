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
    await super.beforeMount(context)
    this.params.set(this.STATUS, "beforeMount")
  }
  async onMount() {
    this.params.set(this.STATUS, "onMount")
  }
  async afterMount() {
    this.params.set(this.STATUS, "afterMount")
  }
  async beforeReset() {
    this.params.set(this.STATUS, "beforeReset")
  }
  async onReset() {
    this.params.set(this.STATUS, "onReset")
  }
  async afterReset() {
    this.params.set(this.STATUS, "afterReset")
  }
  async beforeEject() {
    this.params.set(this.STATUS, "beforeEject")
  }
  async onEject() {
    this.params.set(this.STATUS, "onEject")
  }
  async afterEject() {
    this.params.set(this.STATUS, "afterEject")
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
    expect(service.getStatus()).toBe("afterMount")
    await app.restartService("service")
    expect(service.getStatus()).toBe("afterReset")
    await app.ejectAllServices()
    expect(service.getStatus()).toBe("afterEject")
  })
  it("should throw an error", async () => {
    let app = new Context()
    try {
      app.getService("service")
    } catch(err) {
      expect(err instanceof CoreError).toBe(true)
      expect(err.name).toBe("CoreError")
      expect(err.message).toBe("No service found with the name 'service'")
    }
  })
})