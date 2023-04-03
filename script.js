let container_size = 960;
let grid_size = 12;
let bg_color = 'gray'
const grid_container = document.querySelector('#container');
const btn_reset = document.querySelector('#btn_reset');
const btn_size = document.querySelector('#btn_size');
const mode = document.querySelector('#mode_select');
let passes_count = Array(grid_size).fill().map(() => Array(grid_size).fill(null));

let mouse_down = false;
document.body.onmousedown = () => (mouse_down = true);
document.body.onmouseup = () => (mouse_down = false);


function build_grid(grid_size) {
    for (let i = 0; i < grid_size**2; i++) {
        const item_size = container_size / grid_size;
        const new_item = document.createElement('div');
        new_item.classList.add('item');
        new_item.style['width'] = `${item_size}px`;
        new_item.style['height'] = container_size / grid_size;
        new_item.setAttribute('data-idx', i);
        new_item.addEventListener('mouseover', function(e) {
            if (!mouse_down) return;
            set_color(e);
        });
        grid_container.appendChild(new_item);
    }

    // record the number of passes - create an empty array
    for (let i=0; i < grid_size; i++) {
        for (let j=0; j < grid_size; j++) {
            passes_count[i][j] = 0;
        }
    }
}

function reset() {
    all_items = document.querySelectorAll('.item');
    [...all_items].forEach(function(item) {
        item.style['background-color'] = '';
    });
}

function del_items() {
    grid_container.innerHTML = '';
}

function chg_size() {
    del_items();
    try {
        grid_size = Number(prompt('Enter the number of items per row'));
        build_grid(grid_size);
    }
    catch(err) {
        console.log(err);
    }
}

function set_color(e) {
    if (mode.value === 'color') {
        e.target.style['background-color'] = bg_color;
    } else {
        // increment passes count
        // get the index of the cell
        const idx_i = Math.floor(e.target.dataset.idx / grid_size);
        const idx_j = e.target.dataset.idx % grid_size;
        
        // set the color
        let r = Math.max(0, Math.floor(Math.random() * 256)**(1-0.1*passes_count[idx_i][idx_j]++));
        let g = Math.max(0, Math.floor(Math.random() * 256)**(1-0.1*passes_count[idx_i][idx_j]++));
        let b = Math.max(0, Math.floor(Math.random() * 256)**(1-0.1*passes_count[idx_i][idx_j]++));
        e.target.style['background-color'] = `rgb(${r}, ${g}, ${b})`;
    }    
}

btn_reset.addEventListener('click', reset);
btn_size.addEventListener('click', chg_size);

build_grid(grid_size);