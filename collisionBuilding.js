import * as THREE from 'https://unpkg.com/three/build/three.module.js';

export class Point {
	constructor (x,z) {
		this.x = x;
		this.z = z;
	}
}

export class BSPNode {
	constructor (p1, p2) {
		this.coeff = [-(p2.z - p1.z), p2.x - p1.x, p1.x*p2.z - p2.x*p1.z];
		// for distance computation, need to be normalized
		let factor = Math.sqrt(this.coeff[0]*this.coeff[0] + this.coeff[1]*this.coeff[1]);
		this.coeff[0] /= factor;
		this.coeff[1] /= factor;
		this.coeff[2] /= factor;

		this.p1 = p1;
		this.p2 = p2;
		this.leftChild = null;
		this.rightChild = null;
	}
	break (p) {
		let newLine = new BSPNode (p, this.p2); // the new line
		this.p2 = p;  // the original line
		return newLine;   	 
	}

	setLeftChild (node) {
		this.leftChild = node;
	}
	setRightChild (node) {
		this.rightChild = node;
	}
}

export function buildTree() {
	
	// outer wall
	let A = new Point (-360,-460);
	let B = new Point (-360,460);
	let C = new Point (360,460);
	let D = new Point (360,-460);

	// inner wall 1
	let E1 = new Point (166,-240);
	let F1 = new Point (166,-190);
	let G1 = new Point (245,-190);
	let H1 = new Point (245,-240);
	
	// inner wall 2
	let E2 = new Point (166,190);
	let F2 = new Point (166,240);
	let G2 = new Point (245,240);
	let H2 = new Point (245,190);
	
	// inner wall 3
	let E3 = new Point (-245.5,275);
	let F3 = new Point (-245.5,325);
	let G3 = new Point (0.5,325);
	let H3 = new Point (0.5,275);
	
	// inner wall 4
	let E4 = new Point (-243.5,97);
	let F4 = new Point (-243.5,147);
	let G4 = new Point (-1.5,147);
	let H4 = new Point (-1.5,97);
	
	// inner wall 5
	let E5 = new Point (-108,-347);
	let F5 = new Point (-85,-82);
	let G5 = new Point (-5,-82);
	let H5 = new Point (-5,-347);
	
	// inner wall 6
	let E6 = new Point (-245,-346);
	let F6 = new Point (-245,-82);
	let G6 = new Point (-183,-82);
	let H6 = new Point (-204,-346);
	
	let N1 = buildTree2(A,B,C,D,E1,F1,G1,H1);
	let N2 = buildTree2(A,B,C,D,E2,F2,G2,H2);
	let N3 = buildTree2(A,B,C,D,E3,F3,G3,H3);
	let N4 = buildTree2(A,B,C,D,E4,F4,G4,H4);
	let N5 = buildTree2(A,B,C,D,E5,F5,G5,H5);
	let N6 = buildTree2(A,B,C,D,E6,F6,G6,H6);
	
	return [N1, N2, N3, N4, N5, N6];  // the root node
}

function buildTree2(A,B,C,D,E,F,G,H){
	
	let L1 = new BSPNode (A, B);
	let L1c = L1.break (new Point(-360,-190)); 
	let L1b = L1.break (new Point(-360,-240)); 
	let L1a = L1;
	let L2 = new BSPNode (B, C);
	let L2b = L2.break (new Point(245,460)); 
	let L2a = L2;
	let L3 = new BSPNode (C, D);
	let L3b = L3.break (new Point(360,-240)); 
	let L3a = L3;
	let L4 = new BSPNode (D, A);
	let L4a = L4;
	
	let L5 = new BSPNode (E, F);
	let L6 = new BSPNode (F, G);
	let L7 = new BSPNode (G, H);
	let L8 = new BSPNode (H, F);

	// build BSP tree by hand (inorder traversal)
	L8.setLeftChild (L1a);
	L1a.setLeftChild (L3a);   
	L3a.setLeftChild (L4);   

	L8.setRightChild (L7);
	L7.setLeftChild (L2b);
	L2b.setLeftChild (L3b);

	L7.setRightChild (L6);
	L6.setLeftChild (L2a);
	L2a.setLeftChild (L1c);
	
	L6.setRightChild (L5);
	L5.setLeftChild (L1b);
	
	return L8;  // the root node
}

export function inOut(x,z, node) {
	
	let dis = node.coeff[0]*x + node.coeff[1]*z + node.coeff[2];
	if (dis > 0) {
		if (node.leftChild === null )
			return dis; // free
		else
			return inOut (x,z, node.leftChild);
	} else { // <= 0
		if (node.rightChild === null)
			return false; // solid
		else
			return inOut (x,z, node.rightChild);
	}
   	  
}

