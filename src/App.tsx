import Board from './components/Board';
import styles from './App.module.scss'

function App() {
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>TaskFlow</h1>
      </header>
      <Board />
    </div>
  );
}

export default App;