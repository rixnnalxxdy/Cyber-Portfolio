[Home](index.md) | [About](about.md) | [Projects](projects.md) |

# Cybersecurity learnings

## DAY 1 19/06/25
### How the Internet Works – Beginner Notes
- Internet = network of wires and routers connecting devices worldwide  
- Servers have public IP addresses  
- Clients connect indirectly via Internet Service Providers (ISPs)  
- Data is split into packets for transmission  
- Packets contain pieces of the message  
- Packets are routed through multiple routers to reach destination  
- Each router adds its own IP info (like layers of envelopes)  
- Server unwraps packet layers to retrieve original message  
- Routers act as traffic directors for packets  
- Clients get temporary IPs assigned by ISP
Link: https://www.youtube.com/watch?v=7_LPdttKXPc

### OSI Model
The OSI (Open Systems Interconnection) Model defines how data is transferred through a network. It consists of 7 layers, each responsible for a specific aspect of communication. Each layer uses a package of protocols.
The 7 Layers of the OSI Model (Top to Bottom):
Application Layer

The **OSI (Open Systems Interconnection)** Model defines how data is transferred through a network. It consists of **7 layers**, each responsible for a specific aspect of communication. Each layer uses a package of protocols.

---

#### The 7 Layers of the OSI Model (Top to Bottom):

##### 1. Application Layer
- Used by network applications (e.g., web browsers, email clients).
- **Protocols**: `HTTP`, `HTTPS`, `FTP`, `SMTP`, `Telnet`, etc.
- Handles services like file transfer, web browsing, emails, and virtual terminals.

##### 2. Presentation Layer
- Converts data from application formats (e.g., text, numbers) into binary (e.g., ASCII to EBCDIC).
- Handles **data compression** (lossy/lossless).
- Handles **encryption/decryption** using protocols like **SSL (Secure Sockets Layer)**.
- Ensures data integrity and compatibility between systems.

##### 3. Session Layer
- Establishes, manages, and terminates sessions between devices.
- Handles **authentication** before a session starts.
- Tracks session activity (e.g., which packets belong to which file).
- **Protocols/APIs**: `NetBIOS`, `APIs` (Application Programming Interfaces).
- 
##### 4. Transport Layer
- Ensures **reliable data transfer** via segmentation, flow control, and error control.
- **Segmentation**: Splits data into segments with port and sequence numbers.
- **Flow Control**: Manages the rate of data transmission.
- **Error Control**: Uses **ARQ (Automatic Repeat Request)** and checksums.
- **Protocols**: `TCP` (reliable, connection-based), `UDP` (fast, connectionless – e.g., streaming).

###### 5. Network Layer
- Handles **logical addressing**, **routing**, and **path determination**.
- Assigns sender and receiver **IP addresses**.
- **Routing Protocols**: `OSPF`, `BGP`, `IS-IS`.

##### 6. Data Link Layer
- Responsible for **physical addressing** using **MAC addresses** (12-digit alphanumeric hardware address).
- Packages data into **frames**.
- Controls access to the physical medium (e.g., LAN cables, fiber optics, wireless).
- **Protocols**: `CSMA` (Carrier Sense Multiple Access), `MAC` for media access and error detection.

##### 7. Physical Layer
- Converts binary data into **physical signals** (electrical, light, or radio signals).
- Handles hardware connections (e.g., cables, switches, signal voltage).
- Defines transmission media and bit transmission methods.

---

> 💡 **Mnemonic to remember the OSI layers (top-down):**  
**All People Seem To Need Data Processing**  
(Application, Presentation, Session, Transport, Network, Data Link, Physical)
Link: https://www.youtube.com/watch?v=vv4y_uOneC0

### Ports & Protocols Basics
To do..
Link:https://www.youtube.com/watch?v=yLuaVkxvmk4
