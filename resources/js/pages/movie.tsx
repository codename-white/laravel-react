import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2, Check } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/movies"; // Laravel API

type Movie = { id: number; title: string };

const MovieWishlist: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [error, setError] = useState("");

  // โหลดรายการหนัง
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(API_URL);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถโหลดรายการหนังได้");
    }
  };

  // เพิ่มหนังใหม่
  const addMovie = async () => {
    if (!newMovie.trim()) {
      setError("กรุณากรอกชื่อภาพยนตร์");
      return;
    }
    try {
      const res = await axios.post(API_URL, { title: newMovie });
      setMovies([...movies, res.data]);
      setNewMovie("");
      setError("");
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  // ลบหนัง
  const deleteMovie = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMovies(movies.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
      setError("ลบหนังไม่สำเร็จ");
    }
  };

  // เริ่มแก้ไข
  const startEdit = (movie: Movie) => {
    setEditingId(movie.id);
    setEditingTitle(movie.title);
  };

  // บันทึกแก้ไข
  const saveEdit = async (id: number) => {
    if (!editingTitle.trim()) return;
    try {
      const res = await axios.put(`${API_URL}/${id}`, { title: editingTitle });
      setMovies(movies.map((m) => (m.id === id ? res.data : m)));
      setEditingId(null);
      setEditingTitle("");
      setError("");
    } catch (err) {
      console.error(err);
      setError("แก้ไขหนังไม่สำเร็จ");
    }
  };

  // ยกเลิกแก้ไข
  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  return (
    <>
      <style>{`
        .app-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .movie-box {
          background: white;
          padding: 25px;
          border-radius: 20px;
          width: 400px;
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
          text-align: center;
        }
        .movie-title { font-size: 24px; font-weight: bold; color: #333; margin-bottom: 10px; }
        .movie-subtitle { font-size: 14px; color: #777; margin-bottom: 20px; }
        .add-form { display: flex; gap: 10px; margin-bottom: 15px; }
        .add-input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; outline: none; transition: 0.3s; }
        .add-input:focus { border-color: #ff6b6b; }
        .add-button { background: #ff6b6b; color: white; padding: 10px 15px; border: none; border-radius: 8px; cursor: pointer; transition: 0.3s; }
        .add-button:hover { background: #ff4757; }
        .error-box { color: #ff4757; font-size: 14px; margin-bottom: 10px; }
        .movie-list { margin-top: 10px; }
        .movie-item { display: flex; justify-content: space-between; align-items: center; background: #f9f9f9; padding: 10px 15px; margin-bottom: 8px; border-radius: 8px; transition: 0.3s; }
        .movie-item:hover { background: #f1f1f1; }
        .movie-text { font-size: 16px; color: #333; }
        .icon-btn { background: none; border: none; cursor: pointer; margin-left: 5px; padding: 5px; border-radius: 6px; transition: 0.3s; }
        .icon-btn.edit:hover { background: #ffeaa7; }
        .icon-btn.delete:hover { background: #fab1a0; }
      `}</style>

      <div className="app-container">
        <div className="movie-box">
          <h1 className="movie-title">Movie Wishlist</h1>
          <p className="movie-subtitle">บันทึกภาพยนตร์ที่อยากดู 🎬</p>

          <div className="add-form">
            <input
              type="text"
              className="add-input"
              placeholder="เพิ่มชื่อภาพยนตร์..."
              value={newMovie}
              onChange={(e) => setNewMovie(e.target.value)}
            />
            <button className="add-button" onClick={addMovie}>เพิ่ม</button>
          </div>

          {error && <div className="error-box">{error}</div>}

          <div className="movie-list">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-item">
                {editingId === movie.id ? (
                  <>
                    <input
                      type="text"
                      className="add-input"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                    />
                    <div>
                      <button className="icon-btn edit" onClick={() => saveEdit(movie.id)}>
                        <Check size={18} />
                      </button>
                      <button className="icon-btn delete" onClick={cancelEdit}>✖</button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="movie-text">{movie.title}</span>
                    <div>
                      <button className="icon-btn edit" onClick={() => startEdit(movie)}>
                        <Edit size={18} />
                      </button>
                      <button className="icon-btn delete" onClick={() => deleteMovie(movie.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieWishlist;
