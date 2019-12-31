class Vampire {
	constructor(name, yearConverted) {
		this.name = name;
		this.yearConverted = yearConverted;
		this.offspring = [];
		this.creator = null;
	}

	/** Simple tree methods **/

	// Adds the vampire as an offspring of this vampire
	addOffspring(vampire) {
		this.offspring.push(vampire);
		vampire.creator = this;
	}

	// Returns the total number of vampires created by that vampire
	get numberOfOffspring() {
		return this.offspring.length;
	}

	// Returns the number of vampires away from the original vampire this vampire is
	get numberOfVampiresFromOriginal() {
		let numberOfVampires = 0;
		let currentVamp = this;

		while (currentVamp.creator) {
			currentVamp = currentVamp.creator;
			numberOfVampires++;
		}

		return numberOfVampires;
	}

	// Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
	isMoreSeniorThan(vampire) {
		// console.log(vampire.numberOfVampiresFromOriginal);
		// console.log(this.numberOfVampiresFromOriginal);
		if (
			this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
		) {
			return true;
		} else {
			return false;
		}
	}

	/** Tree traversal methods **/

	// Returns the vampire object with that name, or null if no vampire exists with that name
	vampireWithName(name) {
		
    if(this.name === name){
      return this;
    }
		
		for (const vamp of this.offspring) {
      const vampireLookedFor = vamp.vampireWithName(name);
      if (vampireLookedFor) {
        return vampireLookedFor;
      }
    }
		// for (let key in this.offspring) {
		// 		//search each offspring for name
		// 		console.log(this.offspring[key], "<---NAME");
		// 	if (this.offspring[key].name === name) {
    //       //if the name of the offspring matches, return
    //       console.log('MATCH');
		// 			return this.offspring[key];
		// 	} else if (this.offspring[key].offspring) {
		// 			//if has children, reiterate
		// 			console.log("recursion", this.offspring[key].creator.name);
		// 			this.offspring[key].vampireWithName(name);
		// 	}
		// }
		return null;
	}

	// Returns the total number of vampires that exist
	get totalDescendents() {
		let descendants = 0;
		let currentVamp = this;
		

		function lineage(vamp) {
			for (var i = 0; i < vamp.length; i++) {
				// console.log(vamp[i].name);
				descendants++;
				if (vamp[i].offspring) {
					lineage(vamp[i].offspring);
				}
			}
		}

		if (currentVamp.numberOfOffspring > 0) {
			console.log(currentVamp.name, "only 1");
			lineage(currentVamp.offspring);
		}

		return descendants;
	}

	// Returns an array of all the vampires that were converted after 1980
	get allMillennialVampires() {
		let millenials = [];

		function lineage(vamp) {
			for (var i = 0; i < vamp.length; i++) {
				// console.log(vamp[i].yearConverted, 'year');
				// console.log(vamp[i].name, 'name');
				if (vamp[i].yearConverted > '1980') {
					millenials.push(vamp[i]);
					lineage(vamp[i].offspring);
				} else {
					lineage(vamp[i].offspring);
				}

			}
		}

		lineage(this.offspring);

		return millenials;
	}




	/** Stretch **/

	// Returns the closest common ancestor of two vampires.
	// The closest common anscestor should be the more senior vampire if a direct ancestor is used.
	// For example:
	// * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
	// * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
	closestCommonAncestor(vampire) {}
}

module.exports = Vampire;
