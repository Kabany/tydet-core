import { CoreError } from "./error.core";
import { Service } from "./service.core";

/**
 * Base element for the Core Library. It handles the life cycle of services.
 */
export class Context {
  private services: Map<string, Service> = new Map()

  /** 
   * Returns a service loaded in the context.
   * It can throw an error if the service is not declared or mounted.
   * @param name - Key name to find a declared service in the context.
   */
  getService(name: string) {
    if (!this.services.has(name)) {
      throw new CoreError(`No service found with the name '${name}'`);
    }
    return this.services.get(name)!;
  }

  /** 
   * Returns a service loaded in the context.
   * It can return `null` error if the service is not declared or mounted.
   * @param name - Key name to find a declared service in the context.
   */
  getServiceSafe(name: string) {
    return this.services.get(name);
  }

  /**
   * Mount a declared service. The Context will handle the life cycle of the mounted service.
   * @param name - Key name to find a declared service in the context.
   * @param service - A Core Service to add in the context app.
   */
  async mountService(name: string, service: Service) {
    if (this.services.has(name)) {
      throw new CoreError(`There is a service already loaded with the name '${name}'`);
    }
    await service.beforeMount(this)
    this.services.set(name, service)
    await this.services.get(name).onMount()
    await this.services.get(name).afterMount()
  }

  /** 
   * Restart a service loaded in the context.
   * It can throw an error if the service is not declared or mounted.
   * @param name - Key name to find a declared service in the context.
   */
  async restartService(name: string) {
    if (!this.services.has(name)) {
      throw new CoreError(`No service found with the name '${name}'`);
    }
    await this.services.get(name).beforeReset()
    await this.services.get(name).onReset()
    await this.services.get(name).afterReset()
  }

  /** 
   * Remove a service loaded in the context.
   * It can throw an error if the service is not declared or mounted.
   * @param name - Key name to find a declared service in the context.
   */
  async ejectService(name: string) {
    if (!this.services.has(name)) {
      throw new CoreError(`No service found with the name '${name}'`);
    }
    await this.services.get(name).beforeEject()
    await this.services.get(name).onEject()
    await this.services.get(name).afterEject()
    this.services.delete(name)
  }

  /** 
   * Remove a service loaded in the context.
   * It can throw an error if the service is not declared or mounted.
   * @param name - Key name to find a declared service in the context.
   * @deprecated Since v2.0.0. Please use `ejectService()` instead.
   */
  async unmountService(name: string) {
    await this.ejectService(name)
  }

  /**
   * Unmount all services. Must be called when the main thread will exit.
   */
  async ejectAllServices() {
    let logger: Service
    for await (let pair of this.services.entries()) {
      if (pair[0].startsWith("logger")) {
        logger = pair[1]
      } else {
        let service = pair[1]
        await service.beforeEject()
        await service.onEject()
        await service.afterEject()
        this.services.delete(pair[0])
      }
    }
    if (logger != null) {
      await logger.beforeEject()
      await logger.onEject()
      await logger.afterEject()
    }
  }

  /**
   * Unmount all services. Must be called when the main thread will exit.
   * @deprecated Since v2.0.0. Please use `ejectAllServices()` instead.
   */
  async unmountServices() {
    await this.ejectAllServices()
  }
}

