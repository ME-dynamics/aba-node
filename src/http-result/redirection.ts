import { StatusCodes } from "http-status-codes";
import { IPayloadResult, IUrl } from "../types";


/**
 ** general function for redirection
 * @param args an object containing a url string 
 * @param code http status number
 * @returns an object containing code number, and payload object ( with url key )
 */
function redirection(args: IUrl, code: number): IPayloadResult<IUrl> {
    const  { url } = args;
    if(!url) throw new Error("HTTP: client url must be defined")
    return {
        code,
        payload: {
            url
        },
    }
}

/**
 ** multiple choices
 * @param args an object containing a url string 
 * @returns an object containing code number, and payload object ( with url key )
 */
export function multipleChoices(args: IUrl): IPayloadResult<IUrl> {
    return redirection(args, StatusCodes.MULTIPLE_CHOICES)
}

/**
 ** moved permanently
 * @param args an object containing a url string 
 * @returns an object containing code number, and payload object ( with url key )
 */
export function movedPermanently(args: IUrl): IPayloadResult<IUrl> {
    return redirection(args, StatusCodes.MOVED_PERMANENTLY)
}

/**
 ** moved temporarily
 * @param args an object containing a url string 
 * @returns an object containing code number, and payload object ( with url key )
 */
export function movedTemporarily(args: IUrl): IPayloadResult<IUrl> {
    return redirection(args, StatusCodes.MOVED_TEMPORARILY)
}

/**
 ** see other
 * @param args an object containing a url string 
 * @returns an object containing code number, and payload object ( with url key )
 */
export function seeOther(args: IUrl): IPayloadResult<IUrl> {
    return redirection(args, StatusCodes.SEE_OTHER)
}

/**
 ** not modified
 * @param args an object containing a url string 
 * @returns an object containing code number, and payload object ( with url key )
 */
export function notModified(args: IUrl): IPayloadResult<IUrl> {
    return redirection(args, StatusCodes.NOT_MODIFIED)
}

// export function use_proxy(args: IUrl): IPayloadResult<IUrl> {
//     return redirection(args, StatusCodes.USE_PROXY)
// }

/**
 ** temporary redirect
 * @param args an object containing a url string 
 * @returns an object containing code number, and payload object ( with url key )
 */
export function temporaryRedirect(args: IUrl): IPayloadResult<IUrl> {
    return redirection(args, StatusCodes.TEMPORARY_REDIRECT)
}
/**
 ** permanent redirect
 * @param args an object containing a url string 
 * @returns an object containing code number, and payload object ( with url key )
 */
export function permanentRedirect(args: IUrl): IPayloadResult<IUrl> {
    return redirection(args, StatusCodes.PERMANENT_REDIRECT)
}