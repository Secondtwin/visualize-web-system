/**
 * Bind decorator to make a explicit function binding to context.
 * @returns MethodDecorator
 */
export function Bind(): MethodDecorator {
  return <T>(_1, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    if (!descriptor || (typeof descriptor.value !== 'function')) {
      throw new TypeError(`Only methods can be decorated with @Bind(). <${propertyKey}> is not a method!`);
    }

    return {
      configurable: true,
      get(this: T): T {
        const bound: T = descriptor.value.bind(this);

        Object.defineProperty(this, propertyKey, {
          value: bound,
          configurable: true,
          writable: true,
        });

        return bound;
      },
    };
  };
}
