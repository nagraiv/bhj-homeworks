// (() => {
//   let playing = true,
//     activeHole = 1;
//
//   const stop = () => playing = true,
//     getHole = index => document.getElementById(`hole${index}`),
//     deactivateHole = index =>
//       getHole( index ).className = 'hole',
//     activateHole = index =>
//       getHole( index ).className = 'hole hole_has-mole',
//     next = () => setTimeout(() => {
//       if ( !playing ) {
//         return;
//       }
//       deactivateHole( activeHole );
//       activeHole = Math.floor( 1 + Math.random() * 9 );
//       activateHole( activeHole );
//       next();
//     }, 800 );
//
//   next();
// })();

(() => {
    const randomHole = () => Math.floor( 1 + Math.random() * 9 );
    let activeHole = 1; //в начале игры бобр всегда сидит в первой норке согласно разметке страницы

    const getHole = index => document.getElementById(`hole${index}`);
    const activateHole = index => getHole( index ).className = 'hole hole_has-mole';
    const deactivateHole = index => getHole( index ).className = 'hole';

    const play = () => setInterval(() => {
        deactivateHole( activeHole );
        activeHole = randomHole();
        activateHole( activeHole );
        }, 800 );

    let isPlaying = play();
})();
