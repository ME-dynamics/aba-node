export function calculateParameters(range: number) {
	/* This does the equivalent of:
	 * 
	 *    bitsNeeded = Math.ceil(Math.log2(range));
	 *    bytesNeeded = Math.ceil(bitsNeeded / 8);
	 *    mask = Math.pow(2, bitsNeeded) - 1;
	 * 
	 * ... however, it implements it as bitwise operations, to sidestep any
	 * possible implementation errors regarding floating point numbers in
	 * JavaScript runtimes. This is an easier solution than assessing each
	 * runtime and architecture individually.
	 */
	
	let bitsNeeded = 0;
	let bytesNeeded = 0;
	let mask = 1;
	
	while (range > 0) {
		if (bitsNeeded % 8 === 0) {
			bytesNeeded += 1;
		}
		
		bitsNeeded += 1;
		mask = mask << 1 | 1; /* 0x00001111 -> 0x00011111 */
		
		/* SECURITY PATCH (March 8, 2016):
		 *   As it turns out, `>>` is not the right operator to use here, and
		 *   using it would cause strange outputs, that wouldn't fall into
		 *   the specified range. This was remedied by switching to `>>>`
		 *   instead, and adding checks for input parameters being within the
		 *   range of 'safe integers' in JavaScript.
		 */
		range = range >>> 1;  /* 0x01000000 -> 0x00100000 */
	}
	
	return {bitsNeeded, bytesNeeded, mask};
}