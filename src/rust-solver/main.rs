use std::collections::HashMap;

// bit-shifting equivalent of L move
macro_rules! move_L {
    ($x:ident) => {
             ($x & 0b00000_00000_11111_11111_11111_11111_00000_00000u64)                                                                                                                         // corners 3, 4, 5, 6
        | (((($x & 0b11111_00000_00000_00000_00000_00000_00000_00000u64) >> 35) + 0b00000_00000_00000_00000_00000_00000_00000_01000u64) % 0b00000_00000_00000_00000_00000_00000_00000_11000u64)  // corner 1
        | (((($x & 0b00000_00000_00000_00000_00000_00000_00000_11111u64) <<  5) + 0b00000_00000_00000_00000_00000_00000_10000_00000u64) % 0b00000_00000_00000_00000_00000_00000_11000_00000u64)  // corner 8
        | (((($x & 0b00000_00000_00000_00000_00000_00000_11111_00000u64) << 25) + 0b00000_01000_00000_00000_00000_00000_00000_00000u64) % 0b00000_11000_00000_00000_00000_00000_00000_00000u64)  // corner 7
        | (((($x & 0b00000_11111_00000_00000_00000_00000_00000_00000u64) <<  5) + 0b10000_00000_00000_00000_00000_00000_00000_00000u64) % 0b11000_00000_00000_00000_00000_00000_00000_00000u64); // corner 2
    };
}

// bit-shifting equivalent of R move
macro_rules! move_R {
    ($x: ident) => {
             ($x & 0b11111_11111_00000_00000_00000_00000_11111_11111u64)                                                                                                                         // corners 1, 2, 7, 8
        | (((($x & 0b00000_00000_11111_00000_00000_00000_00000_00000u64) >> 15) + 0b00000_00000_00000_00000_00000_01000_00000_00000u64) % 0b00000_00000_00000_00000_00000_11000_00000_00000u64)  // corner 3
        | (((($x & 0b00000_00000_00000_00000_00000_11111_00000_00000u64) <<  5) + 0b00000_00000_00000_00000_10000_00000_00000_00000u64) % 0b00000_00000_00000_00000_11000_00000_00000_00000u64)  // corner 6
        | (((($x & 0b00000_00000_00000_00000_11111_00000_00000_00000u64) <<  5) + 0b00000_00000_00000_01000_00000_00000_00000_00000u64) % 0b00000_00000_00000_11000_00000_00000_00000_00000u64)  // corner 5
        | (((($x & 0b00000_00000_00000_11111_00000_00000_00000_00000u64) <<  5) + 0b00000_00000_10000_00000_00000_00000_00000_00000u64) % 0b00000_00000_11000_00000_00000_00000_00000_00000u64); // corner 4
    };
}

// bit-shifting equivalent of F move
macro_rules! move_F {
    ($x: ident) => {
             ($x & 0b00000_11111_11111_00000_00000_11111_11111_00000u64)                                                                                                                         // corners 2, 3, 6, 7
        | (((($x & 0b11111_00000_00000_00000_00000_00000_00000_00000u64) >> 15) + 0b00000_00000_00000_10000_00000_00000_00000_00000u64) % 0b00000_00000_00000_11000_00000_00000_00000_00000u64)  // corner 1
        | (((($x & 0b00000_00000_00000_11111_00000_00000_00000_00000u64) >>  5) + 0b00000_00000_00000_00000_01000_00000_00000_00000u64) % 0b00000_00000_00000_00000_11000_00000_00000_00000u64)  // corner 4
        | (((($x & 0b00000_00000_00000_00000_11111_00000_00000_00000u64) >> 15) + 0b00000_00000_00000_00000_00000_00000_00000_10000u64) % 0b00000_00000_00000_00000_00000_00000_00000_11000u64)  // corner 5
        | (((($x & 0b00000_00000_00000_00000_00000_00000_00000_11111u64) << 35) + 0b01000_00000_00000_00000_00000_00000_00000_00000u64) % 0b11000_00000_00000_00000_00000_00000_00000_00000u64); // corner 8
    };
}

// bit-shifting equivalent of B move
macro_rules! move_B {
    ($x: ident) => {
             ($x & 0b11111_00000_00000_11111_11111_00000_00000_11111u64)                                                                                                                         // corners 1, 4, 5, 8
        | (((($x & 0b00000_11111_00000_00000_00000_00000_00000_00000u64) >> 25) + 0b00000_00000_00000_00000_00000_00000_01000_00000u64) % 0b00000_00000_00000_00000_00000_00000_11000_00000u64)  // corner 2
        | (((($x & 0b00000_00000_00000_00000_00000_00000_11111_00000u64) <<  5) + 0b00000_00000_00000_00000_00000_10000_00000_00000u64) % 0b00000_00000_00000_00000_00000_11000_00000_00000u64)  // corner 7
        | (((($x & 0b00000_00000_00000_00000_00000_11111_00000_00000u64) << 15) + 0b00000_00000_01000_00000_00000_00000_00000_00000u64) % 0b00000_00000_11000_00000_00000_00000_00000_00000u64)  // corner 6
        | (((($x & 0b00000_00000_11111_00000_00000_00000_00000_00000u64) <<  5) + 0b00000_10000_00000_00000_00000_00000_00000_00000u64) % 0b00000_11000_00000_00000_00000_00000_00000_00000u64); // corner 3
    };
}

// bit-shifting equivalent of U move
macro_rules! move_U {
    ($x: ident) => {
           ($x & 0b00000_00000_00000_00000_11111_11111_11111_11111u64)         // corners 5, 6, 7, 8
        | (($x & 0b11111_00000_00000_00000_00000_00000_00000_00000u64) >>  5)  // corner 1
        | (($x & 0b00000_11111_00000_00000_00000_00000_00000_00000u64) >>  5)  // corner 2
        | (($x & 0b00000_00000_11111_00000_00000_00000_00000_00000u64) >>  5)  // corner 3
        | (($x & 0b00000_00000_00000_11111_00000_00000_00000_00000u64) << 15); // corner 4
    };
}

// bit-shifting equivalent of D move
macro_rules! move_D {
    ($x: ident) => {
           ($x & 0b11111_11111_11111_11111_00000_00000_00000_00000u64)         // corners 1, 2, 3, 4
        | (($x & 0b00000_00000_00000_00000_11111_00000_00000_00000u64) >>  5)  // corner 5
        | (($x & 0b00000_00000_00000_00000_00000_11111_00000_00000u64) >>  5)  // corner 6
        | (($x & 0b00000_00000_00000_00000_00000_00000_11111_00000u64) >>  5)  // corner 7
        | (($x & 0b00000_00000_00000_00000_00000_00000_00000_11111u64) << 15); // corner 8
    };
}

// bit-shifting equivalent of Li move
macro_rules! move_Li {
    ($x:ident) => {
             ($x & 0b00000_00000_11111_11111_11111_11111_00000_00000u64)                                                                                                                         // corners 3, 4, 5, 6
        | (((($x & 0b00000_11111_00000_00000_00000_00000_00000_00000u64) >> 25) + 0b00000_00000_00000_00000_00000_00000_10000_00000u64) % 0b00000_00000_00000_00000_00000_00000_11000_00000u64)  // corner 2
        | (((($x & 0b00000_00000_00000_00000_00000_00000_11111_00000u64) >>  5) + 0b00000_00000_00000_00000_00000_00000_00000_01000u64) % 0b00000_00000_00000_00000_00000_00000_00000_11000u64)  // corner 7
        | (((($x & 0b00000_00000_00000_00000_00000_00000_00000_11111u64) << 35) + 0b10000_00000_00000_00000_00000_00000_00000_00000u64) % 0b11000_00000_00000_00000_00000_00000_00000_00000u64)  // corner 8
        | (((($x & 0b11111_00000_00000_00000_00000_00000_00000_00000u64) >>  5) + 0b00000_01000_00000_00000_00000_00000_00000_00000u64) % 0b00000_11000_00000_00000_00000_00000_00000_00000u64); // corner 1
    };
}

// bit-shifting equivalent of Ri move
macro_rules! move_Ri {
    ($x: ident) => {
             ($x & 0b11111_11111_00000_00000_00000_00000_11111_11111u64)                                                                                                                         // corners 1, 2, 7, 8
        | (((($x & 0b00000_00000_00000_11111_00000_00000_00000_00000u64) >>  5) + 0b00000_00000_00000_00000_10000_00000_00000_00000u64) % 0b00000_00000_00000_00000_11000_00000_00000_00000u64)  // corner 4
        | (((($x & 0b00000_00000_00000_00000_11111_00000_00000_00000u64) >>  5) + 0b00000_00000_00000_00000_00000_01000_00000_00000u64) % 0b00000_00000_00000_00000_00000_11000_00000_00000u64)  // corner 5
        | (((($x & 0b00000_00000_00000_00000_00000_11111_00000_00000u64) << 15) + 0b00000_00000_10000_00000_00000_00000_00000_00000u64) % 0b00000_00000_11000_00000_00000_00000_00000_00000u64)  // corner 6
        | (((($x & 0b00000_00000_11111_00000_00000_00000_00000_00000u64) >>  5) + 0b00000_00000_00000_01000_00000_00000_00000_00000u64) % 0b00000_00000_00000_11000_00000_00000_00000_00000u64);  // corner 3
    };
}

// bit-shifting equivalent of Fi move
macro_rules! move_Fi {
    ($x: ident) => {
             ($x & 0b00000_11111_11111_00000_00000_11111_11111_00000u64)                                                                                                                         // corners 2, 3, 6, 7
        | (((($x & 0b00000_00000_00000_00000_00000_00000_00000_11111u64) << 15) + 0b00000_00000_00000_00000_01000_00000_00000_00000u64) % 0b00000_00000_00000_00000_11000_00000_00000_00000u64)  // corner 8
        | (((($x & 0b00000_00000_00000_00000_11111_00000_00000_00000u64) <<  5) + 0b00000_00000_00000_10000_00000_00000_00000_00000u64) % 0b00000_00000_00000_11000_00000_00000_00000_00000u64)  // corner 5
        | (((($x & 0b00000_00000_00000_11111_00000_00000_00000_00000u64) << 15) + 0b01000_00000_00000_00000_00000_00000_00000_00000u64) % 0b11000_00000_00000_00000_00000_00000_00000_00000u64)  // corner 4
        | (((($x & 0b11111_00000_00000_00000_00000_00000_00000_00000u64) >> 35) + 0b00000_00000_00000_00000_00000_00000_00000_10000u64) % 0b00000_00000_00000_00000_00000_00000_00000_11000u64); // corner 1
    };
}

// bit-shifting equivalent of Bi move
macro_rules! move_Bi {
    ($x: ident) => {
             ($x & 0b11111_00000_00000_11111_11111_00000_00000_11111u64)                                                                                                                         // corners 1, 4, 5, 8
        | (((($x & 0b00000_00000_11111_00000_00000_00000_00000_00000u64) >> 15) + 0b00000_00000_00000_00000_00000_10000_00000_00000u64) % 0b00000_00000_00000_00000_00000_11000_00000_00000u64)  // corner 3
        | (((($x & 0b00000_00000_00000_00000_00000_11111_00000_00000u64) >>  5) + 0b00000_00000_00000_00000_00000_00000_01000_00000u64) % 0b00000_00000_00000_00000_00000_00000_11000_00000u64)  // corner 6
        | (((($x & 0b00000_00000_00000_00000_00000_00000_11111_00000u64) << 25) + 0b00000_10000_00000_00000_00000_00000_00000_00000u64) % 0b00000_11000_00000_00000_00000_00000_00000_00000u64)  // corner 7
        | (((($x & 0b00000_11111_00000_00000_00000_00000_00000_00000u64) >>  5) + 0b00000_00000_01000_00000_00000_00000_00000_00000u64) % 0b00000_00000_11000_00000_00000_00000_00000_00000u64); // corner 2
    };
}

// bit-shifting equivalent of Ui move
macro_rules! move_Ui {
    ($x: ident) => {
           ($x & 0b00000_00000_00000_00000_11111_11111_11111_11111u64)         // corners 5, 6, 7, 8
        | (($x & 0b00000_00000_00000_11111_00000_00000_00000_00000u64) <<  5)  // corner 4
        | (($x & 0b00000_00000_11111_00000_00000_00000_00000_00000u64) <<  5)  // corner 3
        | (($x & 0b00000_11111_00000_00000_00000_00000_00000_00000u64) <<  5)  // corner 2
        | (($x & 0b11111_00000_00000_00000_00000_00000_00000_00000u64) >> 15); // corner 1
    };
}

// bit-shifting equivalent of Di move
macro_rules! move_Di {
    ($x: ident) => {
           ($x & 0b11111_11111_11111_11111_00000_00000_00000_00000u64)         // corners 1, 2, 3, 4
        | (($x & 0b00000_00000_00000_00000_00000_00000_00000_11111u64) <<  5)  // corner 8
        | (($x & 0b00000_00000_00000_00000_00000_00000_11111_00000u64) <<  5)  // corner 7
        | (($x & 0b00000_00000_00000_00000_00000_11111_00000_00000u64) <<  5)  // corner 6
        | (($x & 0b00000_00000_00000_00000_11111_00000_00000_00000u64) >> 15); // corner 5
    };
}

// bit-shifting equivalent of L2 move
macro_rules! move_L2 {
    ($x:ident) => {
           ($x & 0b00000_00000_11111_11111_11111_11111_00000_00000u64)                                                                                                                         // corners 3, 4, 5, 6
        | (($x & 0b11111_00000_00000_00000_00000_00000_00000_00000u64) >> 30)  // corner 1
        | (($x & 0b00000_00000_00000_00000_00000_00000_11111_00000u64) << 30)  // corner 7
        | (($x & 0b00000_00000_00000_00000_00000_00000_00000_11111u64) << 30)  // corner 8
        | (($x & 0b00000_11111_00000_00000_00000_00000_00000_00000u64) >> 30); // corner 2
    };
}

// bit-shifting equivalent of R2 move
macro_rules! move_R2 {
    ($x: ident) => {
           ($x & 0b11111_11111_00000_00000_00000_00000_11111_11111u64)                                                                                                                         // corners 1, 2, 7, 8
        | (($x & 0b00000_00000_11111_00000_00000_00000_00000_00000u64) >> 10)  // corner 3
        | (($x & 0b00000_00000_00000_00000_11111_00000_00000_00000u64) << 10)  // corner 5
        | (($x & 0b00000_00000_00000_00000_00000_11111_00000_00000u64) << 10)  // corner 6
        | (($x & 0b00000_00000_00000_11111_00000_00000_00000_00000u64) >> 10); // corner 4
    };
}

// bit-shifting equivalent of F2 move
macro_rules! move_F2 {
    ($x: ident) => {
           ($x & 0b00000_11111_11111_00000_00000_11111_11111_00000u64)                                                                                                                         // corners 2, 3, 6, 7
        | (($x & 0b11111_00000_00000_00000_00000_00000_00000_00000u64) >> 20)  // corner 1
        | (($x & 0b00000_00000_00000_00000_11111_00000_00000_00000u64) << 20)  // corner 5
        | (($x & 0b00000_00000_00000_11111_00000_00000_00000_00000u64) >> 20)  // corner 4
        | (($x & 0b00000_00000_00000_00000_00000_00000_00000_11111u64) << 20); // corner 8
    };
}

// bit-shifting equivalent of B2 move
macro_rules! move_B2 {
    ($x: ident) => {
           ($x & 0b11111_00000_00000_11111_11111_00000_00000_11111u64)                                                                                                                         // corners 1, 4, 5, 8
        | (($x & 0b00000_11111_00000_00000_00000_00000_00000_00000u64) >> 20)  // corner 2
        | (($x & 0b00000_00000_00000_00000_00000_11111_00000_00000u64) << 20)  // corner 6
        | (($x & 0b00000_00000_00000_00000_00000_00000_11111_00000u64) << 20)  // corner 7
        | (($x & 0b00000_00000_11111_00000_00000_00000_00000_00000u64) >> 20); // corner 3
    };
}

// bit-shifting equivalent of U2 move
macro_rules! move_U2 {
    ($x: ident) => {
           ($x & 0b00000_00000_00000_00000_11111_11111_11111_11111u64)         // corners 5, 6, 7, 8
        | (($x & 0b11111_00000_00000_00000_00000_00000_00000_00000u64) >> 10)  // corner 1
        | (($x & 0b00000_00000_11111_00000_00000_00000_00000_00000u64) << 10)  // corner 3
        | (($x & 0b00000_11111_00000_00000_00000_00000_00000_00000u64) >> 10)  // corner 2
        | (($x & 0b00000_00000_00000_11111_00000_00000_00000_00000u64) << 10); // corner 4
    };
}

// bit-shifting equivalent of D2 move
macro_rules! move_D2 {
    ($x: ident) => {
           ($x & 0b11111_11111_11111_11111_00000_00000_00000_00000u64)         // corners 1, 2, 3, 4
        | (($x & 0b00000_00000_00000_00000_11111_00000_00000_00000u64) >> 10)  // corner 5
        | (($x & 0b00000_00000_00000_00000_00000_00000_11111_00000u64) << 10)  // corner 7
        | (($x & 0b00000_00000_00000_00000_00000_11111_00000_00000u64) >> 10)  // corner 6
        | (($x & 0b00000_00000_00000_00000_00000_00000_00000_11111u64) << 10); // corner 8
    };
}


// look up the inverse of a given move
fn move_inverse(move_val: u8) -> u8 {
    return match move_val {
        1  => 7,  // L -> Li
        2  => 8,  // R -> Ri
        3  => 9,  // F -> Fi
        4  => 10, // B -> Bi
        5  => 11, // U -> Ui
        6  => 12, // D -> Di
        7  => 1,  // Li -> L
        8  => 2,  // Ri -> R
        9  => 3,  // Fi -> F
        10 => 4,  // Bi -> B
        11 => 5,  // Ui -> U
        12 => 6,  // Di -> D
        13 => 13, // L2 -> L2
        14 => 14, // R2 -> R2
        15 => 15, // F2 -> F2
        16 => 16, // B2 -> B2
        17 => 17, // U2 -> U2
        18 => 18, // D2 -> D2
        _  => 0,  // 0 is an error flag
    }
}


// convert array representation of state to compact bit representation
fn bit_repr_from_array(arr: &[u8; 16]) -> u64 {
    let mut bit_repr: u64 = 0;
    for i in 0..8 {
        // the array stores cubies in pairs
        // the second element is the orientation
        bit_repr = (bit_repr << 2) + u64::from(arr[2*i+1]);
        // and the first element is the cubie
        bit_repr = (bit_repr << 3) + u64::from(arr[2*i]);
    }
    return bit_repr;
}


// convert compact bit representation of state to array representation
fn array_from_bit_repr(mut bit_repr: u64) -> [u8; 16] {
    let mut arr: [u8; 16] = [0; 16];
    for i in (0..8).rev() {
        arr[2*i] = (bit_repr & 0b111) as u8;
        bit_repr >>= 3;
        arr[2*i+1] = (bit_repr & 0b11) as u8;
        bit_repr >>= 2;
    }
    return arr;
}


// return a HashMap with the states reachable from current_states (excluding any reachable states already in current_states)
fn compute_reachable_states(current_states: &HashMap<u64, u64>) -> HashMap<u64, u64> {
    let mut new_states: HashMap<u64, u64> = HashMap::new();
    for (state, move_seq) in current_states {
        // we simply try each move, and if we reach a new state, keep track of the new state and the move sequence taken to reach it
        let mut new_state = move_L!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 1);
        }
        new_state = move_R!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 2);
        }
        new_state = move_F!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 3);
        }
        new_state = move_B!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 4);
        }
        new_state = move_U!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 5);
        }
        new_state = move_D!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 6);
        }
        new_state = move_Li!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 7);
        }
        new_state = move_Ri!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 8);
        }
        new_state = move_Fi!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 9);
        }
        new_state = move_Bi!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 10);
        }
        new_state = move_Ui!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 11);
        }
        new_state = move_Di!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 12);
        }
        new_state = move_L2!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 13);
        }
        new_state = move_R2!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 14);
        }
        new_state = move_F2!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 15);
        }
        new_state = move_B2!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 16);
        }
        new_state = move_U2!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 17);
        }
        new_state = move_D2!(state);
        if !new_states.contains_key(&new_state) && !current_states.contains_key(&new_state) {
            new_states.insert(new_state, (move_seq << 5) + 18);
        }
    }
    return new_states;
}


// return an array with the moves needed to transform the cube from starting_state to solved_state
fn solve(starting_state: u64, solved_state: u64) -> [u8; 11] {
    /* we are using a meet-in-the-middle approach
     * so we work from starting_state (left_reached_states) and solved_state (right_reached_states)
     * until we find some state reachable from both the left and right (middle_state)
     */
    let mut left_reached_states: HashMap<u64, u64> = HashMap::new();
    let mut right_reached_states: HashMap<u64, u64> = HashMap::new();
    left_reached_states.insert(starting_state, 0);
    right_reached_states.insert(solved_state, 0);

    let mut solution_found = false;
    let mut middle_state: u64 = 0;

    // if the two given states are the same, we are done
    if starting_state == solved_state {
        solution_found = true;
        middle_state = starting_state;
    }

    // otherwise start working from both sides
    while !solution_found {
        // compute all states reachable from left_states by one face turn
        let new_states: HashMap<u64, u64> = compute_reachable_states(&left_reached_states);
        left_reached_states.extend(&new_states);

        // check if we have a middle_state yet
        for state in right_reached_states.keys() {
            if left_reached_states.contains_key(&state) {
                solution_found = true;
                middle_state = *state;
                break;
            }
        }

        // if we found a middle_state, we're done
        if solution_found {
            break;
        }

        // otherwise, we repeat for right_states
        let new_states = compute_reachable_states(&right_reached_states);
        right_reached_states.extend(&new_states);

        for state in right_reached_states.keys() {
            if left_reached_states.contains_key(&state) {
                solution_found = true;
                middle_state = *state;
                break;
            }
        }
    }

    // by this point, we have met in the middle
    // so we can look up the move sequences needed to get to middle_state from both sides
    let mut left_seq = *left_reached_states.get(&middle_state).unwrap();
    let mut right_seq = *right_reached_states.get(&middle_state).unwrap();

    // for a 2x2 cube, the maximum number of face turns in a solution is 11
    let mut solution_seq: [u8; 11] = [0; 11];
    let mut i: usize = 0;

    // unpack the sequence from the left to the middle
    // since we are unpacking from the right end, we are getting the moves in reverse order
    // so we first unpack it into a temporary vector
    let mut temp_seq = Vec::new();
    while left_seq != 0 {
        let next_move = (left_seq & 0b11111) as u8;
        temp_seq.push(next_move);
        left_seq >>= 5;
    }
    while temp_seq.len() > 0 {
        let next_move = temp_seq.pop().unwrap();
        solution_seq[i] = next_move;
        i += 1;
    }

    // now we unpack the sequence from the right to the middle
    // we have to take the inverses of the moves
    while right_seq != 0 {
        let next_move = (right_seq & 0b11111) as u8;
        solution_seq[i] = move_inverse(next_move);
        right_seq >>= 5;
        i += 1;
    }

    // and we're done!
    return solution_seq;
}


// test driver program
fn main() {
    let solved_state: u64 = 0b00000_00001_00010_00011_00100_00101_00110_00111;

    let starting_state: [u8; 16] = [5, 2, 1, 2, 4, 0, 7, 1, 2, 1, 0, 0, 6, 0, 3, 0];
    let mut starting_state = bit_repr_from_array(&starting_state);

    let solution_seq = solve(starting_state, solved_state);

    println!("{:?}", solution_seq);
}
