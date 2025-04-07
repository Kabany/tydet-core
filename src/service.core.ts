import { Context } from "./context.core"
import { CoreError } from "./error.core"

/**
 * Context component of the TyAPI Core. Handle the app services like connections to databases or bring several handlers available in the context core.
 */
export class Service {
  protected params: Map<string, any>
  private callUnmount = false
  context: Context

  /**
   * Create a service to be added in the context on the app.
   * @param params - Variables required to initiate the service
   */
  constructor(params: Map<string, any>) {
    this.params = params
  }

  /**
   * Handle the event to prepare the service parameters.
   */
  async beforeMount(context: Context) {
    this.context = context
    if (this.params == null) {
      this.params = new Map()
    }
  }

  /**
   * Handle the event to start up the service. It can be used for create a connection with the database as an example.
   */
  async onMount() {}

  /**
   * Handle the event after starting up the service. It can be used to log or notify that the service started with success.
   */
  async afterMount() {}

  /**
   * Handle the event to prepare the parameters before resetting the service.
   */
  async beforeReset() {}

  /**
   * Handle the event to restart the service. It can be used to create a new connection to the database as an example.
   */
  async onReset() {}

  /**
   * Handle the event after resetting the service. It can be used to log or notify that the service restarted with success.
   */
  async afterReset() {}

  /**
   * Handle the event to prepare the service to be ejected. It can be used to clear pending jobs before ejecting.
   */
  async beforeEject() {
    if (this.beforeUnmount) await this.beforeUnmount()
  }

  /**
   * Handle the event to eject the service. It can be used to close the connection to the database as an example.
   */
  async onEject() {
    if (this.onUnmount) await this.onUnmount()
  }

  /**
   * Handle the event after ejecting the service. It can be used to log or notify that the service ended with success.
   */
  async afterEject() {
    if (this.params != null) {
      this.params.clear()
    }
  }

  

  /**
   * @deprecated Since v2.0.0. Please use `beforeEject()` instead.
   */
  beforeUnmount: () => Promise<void>

  /**
   * @deprecated Since v2.0.0. Please use `onEject()` instead.
   */
  onUnmount: () => Promise<void>
}