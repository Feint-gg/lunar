#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde::{Serialize};
use lcu::{get_league_path, parse_lock_file};
use sysinfo::ProcessExt;
use tauri::{Manager, Window};

mod lcu;

#[derive(Clone, Serialize)]
struct StateUpdate {
    state: String,
}

#[derive(Clone, Serialize)]
struct ConnectionStateUpdate {
    state: String,
    port: i32,
    token: String,
}

#[tauri::command]
fn watch_lcu(window: Window) {
    std::thread::spawn(move || {
        let window_clone = window.clone();
        let mut connected = false;

        loop {
            let process_path = get_league_path();

            if process_path.is_none() {
                if connected {
                    connected = false;
                    window_clone.emit("lcu-state-update", StateUpdate {
                        state: "disconnected".into(),
                    }).unwrap();
                }
            } else {
                if !connected {
                    let lock_file = parse_lock_file(&process_path.unwrap()).unwrap();

                    connected = true;
                    window_clone.emit("lcu-state-update", ConnectionStateUpdate {
                        state: "connected".into(),
                        port: lock_file.port,
                        token: lock_file.token,
                    }).unwrap();
                }
            }

            std::thread::sleep(std::time::Duration::from_millis(500));
        }
    });
}

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .menu(if cfg!(target_os = "macos") {
            tauri::Menu::os_default(&context.package_info().name)
        } else {
            tauri::Menu::default()
        })
        .invoke_handler(tauri::generate_handler![watch_lcu])
        .run(context)
        .expect("error while running tauri application");
}
