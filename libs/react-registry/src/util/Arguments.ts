// import { Args } from '../types'
import Logger from './Logger';

export const isValid = (args: any): boolean => 
  typeof args === 'string' || (typeof args === 'object' && (
    (typeof args.id === 'string' && typeof args.conditions === 'undefined' && typeof args.registry === 'undefined') ||
    (typeof args.id === 'string' && typeof args.conditions === 'object' && typeof args.registry === 'undefined') ||
    (typeof args.id === 'string' && typeof args.conditions === 'undefined' && typeof args.registry === 'string') ||
    (typeof args.id === 'string' && typeof args.conditions === 'object' && typeof args.registry === 'string')
  ));

	export const parseArgs = (params: any, thow: boolean = true) => {
  if (thow && !isValid(params)) {
    Logger.throw("arguments.common"); // id is essential, throw error instead of logging it
  }

  return {
    id: (typeof params === 'string') ? params : params.id,
    conditions: params.conditions,
    registry: params.registry,
  }
}

export const parseComponentArgs = (component: any, params: string | object) => {
  const paramArgs = parseArgs(params, false);
  const componentArgs: any = {};
  
  // Arugmnets provided by component functions
  if (typeof component !== 'undefined') {   
    // Id provided by component
    if (typeof component.getId !== 'undefined') {
      componentArgs.id = component.getId();
    }

    // Conditions provided by component
    if (typeof component.getConditions !== 'undefined') {
      componentArgs.conditions = component.getConditions();
    }

    // Registry provided by component
    if (typeof component.getRegistry !== 'undefined') {
      componentArgs.registry = component.getRegistry();
    }
  }

  // Arguments provied to register function. Override those provided by component.
  if (typeof paramArgs !== 'undefined') {   
    // Override id provied by component function with id provied by args
    if (typeof paramArgs.id !== 'undefined') {
      componentArgs.id = paramArgs.id;
    }

    // Override conditions provied by component function with conditions provied by args
    if (typeof paramArgs.conditions !== 'undefined') {
      componentArgs.conditions = paramArgs.conditions;
    }

    // Override registry provied by component function with registry provied by args
    if (typeof paramArgs.registry !== 'undefined') {
      componentArgs.registry = paramArgs.registry;
    }
  }

  return parseArgs(componentArgs);
}
