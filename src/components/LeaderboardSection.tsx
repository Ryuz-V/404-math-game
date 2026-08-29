"use client";

import { useState } from 'react';

interface LeaderboardItem {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  versusWins: number;
  badge: string;
  color: string;
}

const DEFAULT_LEADERBOARD: LeaderboardItem[] = [
  { rank: 1, name: 'Arya Pratama', avatar: '👑', score: 1450, streak: 12, versusWins: 18, badge: 'Grandmaster Mtk', color: '#ffdc00' },
  { rank: 2, name: 'Nabila Zahra', avatar: '⚡', score: 1320, streak: 10, versusWins: 15, badge: 'Kalkulus Pro', color: '#82fed6' },
  { rank: 3, name: 'Rian Hidayat', avatar: '🎯', score: 1210, streak: 9, versusWins: 14, badge: 'Geometri Master', color: '#ffb17a' },
  { rank: 4, name: 'Siti Rahma', avatar: '🔥', score: 1050, streak: 8, versusWins: 11, badge: 'Peluang Wizard', color: '#00d0ff' },
  { rank: 5, name: 'Budi Santoso', avatar: '🚀', score: 920, streak: 6, versusWins: 9, badge: 'Statistikawan', color: '#fff' },
  { rank: 6, name: 'Fitri Handayani', avatar: '⭐', score: 850, streak: 5, versusWins: 7, badge: 'Pejuang UTBK', color: '#fff' },
  { rank: 7, name: 'Dimas Aditya', avatar: '🧠', score: 780, streak: 5, versusWins: 6, badge: 'Speed Runner', color: '#fff' },
  { rank: 8, name: 'Clara Michelle', avatar: '📐', score: 690, streak: 4, versusWins: 5, badge: 'Dimensi Tiga Ace', color: '#fff' },
];

interface LeaderboardSectionProps {
  onStartSolo: () => void;
  onStartVersus: () => void;
  onOpenLogin: () => void;
  currentUser?: { name: string; avatar: string; isLoggedIn: boolean; score?: number };
}

export default function LeaderboardSection({
  onStartSolo,
  onStartVersus,
  onOpenLogin,
  currentUser
}: LeaderboardSectionProps) {
  const [filter, setFilter] = useState<'all' | 'solo' | 'versus'>('all');

  const userHasPoints = (currentUser?.score || 0) > 0;
  const isUserEligible = currentUser?.isLoggedIn && userHasPoints;

  // Compute leaderboard with current user inserted if they have points
  let activeLeaderboard = [...DEFAULT_LEADERBOARD];

  if (isUserEligible) {
    const existingIndex = activeLeaderboard.findIndex(u => u.name === currentUser.name);
    const userScore = currentUser.score || 0;
    const userItem: LeaderboardItem = {
      rank: 0,
      name: currentUser.name,
      avatar: currentUser.avatar,
      score: userScore,
      streak: Math.min(15, Math.floor(userScore / 100)),
      versusWins: Math.floor(userScore / 150),
      badge: userScore >= 1000 ? 'Master Matematika' : userScore >= 500 ? 'Pejuang Mtk' : 'Penantang Baru',
      color: '#ffdc00'
    };

    if (existingIndex >= 0) {
      activeLeaderboard[existingIndex] = {
        ...activeLeaderboard[existingIndex],
        score: Math.max(activeLeaderboard[existingIndex].score, userScore),
        avatar: currentUser.avatar
      };
    } else {
      activeLeaderboard.push(userItem);
    }

    activeLeaderboard.sort((a, b) => b.score - a.score);
    activeLeaderboard = activeLeaderboard.map((item, idx) => ({ ...item, rank: idx + 1 }));
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div className="game-badge">🏆 Papan Peringkat Juara</div>
        <h1 className="leaderboard-title">Leaderboard Matematika</h1>
        <p className="leaderboard-subtitle">
          Daftar murid dan master matematika dengan skor tertinggi di Solo Mode dan kemenangan terbanyak di Duel 1 vs 1!
        </p>

        {/* User Qualification Banner */}
        {isUserEligible ? (
          <div className="user-leaderboard-card">
            <div className="user-lead-left">
              <span className="user-lead-avatar">{currentUser.avatar}</span>
              <div>
                <div className="user-lead-name">
                  {currentUser.name} <span className="badge-pill">Akun Aktif</span>
                </div>
                <div className="user-lead-sub">
                  Total Poin Kamu: <strong>{currentUser.score} Pts</strong>
                </div>
              </div>
            </div>
            <div className="user-lead-right">
              <span className="user-rank-highlight">
                🎖️ Peringkat #{activeLeaderboard.find(u => u.name === currentUser.name)?.rank || '-'}
              </span>
            </div>
          </div>
        ) : (
          <div className="leaderboard-requirement-box">
            <div className="req-icon">🔒</div>
            <div className="req-info">
              <h4>Ingin Namamu Masuk ke Papan Peringkat?</h4>
              <p>
                {!currentUser?.isLoggedIn
                  ? 'Pastikan kamu sudah login ke akunmu dan kumpulkan poin dengan memainkan Game Solo atau Duel 1 vs 1!'
                  : 'Kamu sudah login! Mainkan Game Solo atau Duel 1 vs 1 untuk mencetak poin dan membuka peringkatmu di sini.'}
              </p>
            </div>
            <div className="req-actions">
              {!currentUser?.isLoggedIn && (
                <button className="btn-lead-action btn-login-req" onClick={onOpenLogin}>
                  🔑 Login Akun
                </button>
              )}
              <button className="btn-lead-action btn-play-req" onClick={onStartSolo}>
                🎯 Mainkan Kuis & Kumpulkan Poin
              </button>
            </div>
          </div>
        )}

        <div className="leaderboard-controls-row">
          <div className="leaderboard-filter-tabs">
            <button
              className={`lead-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              🌟 Semua Kategori
            </button>
            <button
              className={`lead-tab ${filter === 'solo' ? 'active' : ''}`}
              onClick={() => setFilter('solo')}
            >
              🎯 Solo Time Attack
            </button>
            <button
              className={`lead-tab ${filter === 'versus' ? 'active' : ''}`}
              onClick={() => setFilter('versus')}
            >
              ⚔️ Duel 1 vs 1 (Duo)
            </button>
          </div>
        </div>
      </div>

      <div className="leaderboard-card">
        {/* Top 3 Podium */}
        {activeLeaderboard.length >= 3 && (
          <div className="podium-grid">
            {/* Rank 2 */}
            <div className="podium-item podium-silver">
              <div className="podium-avatar">{activeLeaderboard[1].avatar}</div>
              <div className="podium-rank-badge">#2 Silver</div>
              <div className="podium-name">{activeLeaderboard[1].name}</div>
              <div className="podium-score">{activeLeaderboard[1].score} Pts</div>
              <span className="podium-tag">{activeLeaderboard[1].badge}</span>
            </div>

            {/* Rank 1 */}
            <div className="podium-item podium-gold">
              <div className="crown-icon">👑</div>
              <div className="podium-avatar gold-avatar">{activeLeaderboard[0].avatar}</div>
              <div className="podium-rank-badge gold-badge">#1 Juara 1</div>
              <div className="podium-name">{activeLeaderboard[0].name}</div>
              <div className="podium-score">{activeLeaderboard[0].score} Pts</div>
              <span className="podium-tag gold-tag">{activeLeaderboard[0].badge}</span>
            </div>

            {/* Rank 3 */}
            <div className="podium-item podium-bronze">
              <div className="podium-avatar">{activeLeaderboard[2].avatar}</div>
              <div className="podium-rank-badge">#3 Bronze</div>
              <div className="podium-name">{activeLeaderboard[2].name}</div>
              <div className="podium-score">{activeLeaderboard[2].score} Pts</div>
              <span className="podium-tag">{activeLeaderboard[2].badge}</span>
            </div>
          </div>
        )}

        {/* Full Table */}
        <div className="leaderboard-table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Nama Murid</th>
                <th>Gelar / Badge</th>
                <th>Max Streak</th>
                <th>Kemenangan 1v1</th>
                <th>Total Skor</th>
              </tr>
            </thead>
            <tbody>
              {activeLeaderboard.map((user) => (
                <tr
                  key={user.rank}
                  className={`${user.rank <= 3 ? 'top-row' : ''} ${
                    currentUser?.isLoggedIn && currentUser.name === user.name ? 'current-user-highlight' : ''
                  }`}
                >
                  <td className="rank-cell">
                    <span className={`rank-circle rank-${user.rank}`}>
                      {user.rank}
                    </span>
                  </td>
                  <td className="user-cell">
                    <span className="user-avatar">{user.avatar}</span>
                    <span className="user-name">
                      {user.name}
                      {currentUser?.isLoggedIn && currentUser.name === user.name && (
                        <span className="current-user-tag">👑 Kamu</span>
                      )}
                    </span>
                  </td>
                  <td>
                    <span className="user-badge-tag">{user.badge}</span>
                  </td>
                  <td className="stat-cell">🔥 {user.streak}x</td>
                  <td className="stat-cell">⚔️ {user.versusWins} Win</td>
                  <td className="score-cell">
                    <strong>{user.score}</strong> Pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="leaderboard-cta-bar">
          <div>
            <h3>Tingkatkan Peringkatmu Sekarang!</h3>
            <p>Mainkan kuis Solo atau kalahkan temanmu di duel 1 vs 1 untuk mendongkrak total skor akunmu!</p>
          </div>
          <div className="cta-btn-group">
            <button className="btn-lead-action btn-solo" onClick={onStartSolo}>
              🎯 Main Solo Kuis
            </button>
            <button className="btn-lead-action btn-versus" onClick={onStartVersus}>
              ⚔️ Duel 1 vs 1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
