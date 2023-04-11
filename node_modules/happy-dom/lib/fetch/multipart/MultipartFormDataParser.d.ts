/// <reference types="node" />
/// <reference types="node" />
import FormData from '../../form-data/FormData';
import Stream from 'stream';
/**
 * Multipart form data factory.
 *
 * Based on:
 * https://github.com/node-fetch/node-fetch/blob/main/src/utils/multipart-parser.js (MIT)
 */
export default class MultipartFormDataParser {
    /**
     * Returns form data.
     *
     * @param body Body.
     * @param contentType Content type header value.
     * @returns Form data.
     */
    static streamToFormData(body: Stream.Readable, contentType: string): Promise<FormData>;
    /**
     * Converts a FormData object to a ReadableStream.
     *
     * @param formData FormData.
     * @returns Stream and type.
     */
    static formDataToStream(formData: FormData): {
        contentType: string;
        contentLength: number;
        buffer: Buffer;
        stream: Stream.Readable;
    };
    /**
     * Escapes a form data entry name.
     *
     * @param name Name.
     * @param filename Whether it is a filename.
     * @returns Escaped name.
     */
    private static escapeName;
}
//# sourceMappingURL=MultipartFormDataParser.d.ts.map