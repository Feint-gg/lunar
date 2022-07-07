use std::path::Path;
use sysinfo::{System, Process, SystemExt, ProcessExt};
use std::{fs, time::Duration};
use eyre::{eyre, Result};

pub struct LockFileInfo {
    pub port: i32,
    pub token: String
}

pub fn get_league_path() -> Option<String> {
    let sys = System::new_all();
    
    let processes: Vec<&Process> = sys.processes_by_exact_name("LeagueClientUx.exe").collect();

    if processes.len() == 0 {
        return None;
    }

    let process = processes[0];

    Some(process.exe().to_str().map(|s| s.to_string()).unwrap())
}

pub fn parse_lock_file(lol_path: &str) -> Result<LockFileInfo> {
    let lockfile_path_string = &lol_path.replace("LeagueClientUx.exe", "lockfile");

    let lockfile_path = Path::new(lockfile_path_string);

    if !lockfile_path.exists() {
        watch_file(lockfile_path)?;
    }
    
    let contents = fs::read_to_string(&lockfile_path)?;

    let split: Vec<&str> = contents.split(':').collect();

    let lock_file_info = LockFileInfo {
        port: split[2].parse::<i32>().unwrap(),
        token: base64::encode(format!("riot:{}", split[3])),
    };

    Ok(lock_file_info)
}

fn watch_file(path: &Path) -> Result<()> {
    let now = std::time::Instant::now();

    let result: eyre::Result<()> = loop {
        if path.exists() {
            break Ok(());
        }

        if now.elapsed().as_millis() > 20000 {
            break Err(eyre!("Couldn't find lockfile after 20 seconds..."));
        }

        std::thread::sleep(Duration::from_millis(100));
    };

    result
}