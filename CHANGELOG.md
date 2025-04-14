# Change Log

All notable changes to the "img-contextual" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.2.9] - 2024-4-14

### Added
- Extended support for Base64 encoding to include `".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".svg", ".woff", ".woff2", ".ttf", ".mp3", ".ogg", ".mp4", ".pdf", ".json", ".html"`
- Refactored MIME map and file extension handling for broader use cases beyond images.
- Theme-adaptive preview panel.
- Checkerboard background to visualize transparency in images.
- Metadata section below image preview for static information.
- Codicon icons to command titles for visual clarity in the Command Palette.

### Changed
- Refactored `extension.ts` to modular command handlers with output logging.
- Improved naming and logic in `encoder.ts` for clarity and consistency.
- Updated `img` styling to be theme-aware with semi-transparent patterns.
- Improved command titles to start with `Base64:` for better discoverability.

### Fixed
- Layout centering in image preview using flexbox for accurate image alignment.