[Home](docs/index.md) | [Projects](docs/projects.md) |

# Cybersecurity learnings

## DAY 8 05/07/25 : Cloud Hardening

### Key Concepts

- **Use of Server Baseline Image**  
  - A standard, pre-configured image used as a secure starting point for cloud servers.

- **Identity and Access Management (IAM)**  
  - Controls who can access cloud resources and what actions they can perform.

- **Configuration Management**  
  - Ensuring cloud resources are securely configured and compliant with policies.

- **Zero-Day Attack**  
  - Exploitation of unknown vulnerabilities before patches are available.

- **Shared Responsibility Model**  
  - Cloud provider and customer share security duties. Providers secure the infrastructure, customers secure data and configurations.

- **Hypervisors**  
  - **Type 1:** Runs directly on host hardware (bare-metal).  
  - **Type 2:** Runs on a host operating system (e.g., VirtualBox).

- **Baselining**  
  - Fixed reference point used to compare changes made to cloud environments.

- **Cryptography in Cloud**  
  - Uses encryption and secure key management systems to protect data.

- **Cryptographic Erasure**  
  - Method of erasing data by deleting or destroying the encryption keys.

- **Key Management**  
  - Examples:  
    - **Trusted Platform Module (TPM):** Hardware chip that securely stores passwords, certificates, and keys.  
    - **Cloud Hardware Security Module (HSM):** Device for securely storing cryptographic keys and processing cryptographic operations.

---

## DAY 7 03/07/25: Security Hardening

### Overview
- Process of strengthening a system to reduce vulnerability and attack surface.
- Includes software updates/patches, security configuration changes (e.g., updating encryption standards), removing unused ports, apps, and networks.
- Conduct regular penetration testing.

### OS Hardening
- OS acts as intermediary between software and devices.
- Key practices: updates, backups, authorized lists of users and devices.
- Patch updates should be added to baseline configuration.
- Proper disposal of hardware and software.
- Implement strong password policies and Multi-Factor Authentication (MFA).

### Brute Force Attacks
- **Simple brute force:** Guessing passwords.
- **Dictionary attacks:** Use lists of commonly used passwords.
- Tedious and time-consuming for attackers.

### Virtual Machines (VMs)
- Useful for investigating potentially infected machines or malware in a constrained environment.
- Risk: Malicious programs can escape virtualization to infect the host machine.

### Sandbox Environments
- Allow testing isolated from your main network.
- Can be costly.

### Prevention Methods for Password Hacks
- **Salting and Hashing:** Hashing converts info into a unique value (one-way encryption), salting adds random characters to hashed passwords.
- Use MFA.
- CAPTCHA and reCAPTCHA verify human users, not bots.
- Enforce strong password policies.

### Network Hardening
- Port filtering.
- Network access privilege management.

### Regular Maintenance Tasks
- Firewall rules maintenance.
- Network log analysis.
- Patch updates.
- Server backups.

### Less Frequent Tasks
- Port filtering reviews.
- Updating wireless protocols.
- Network segmentation.
- Following latest encryption standards.

### Intrusion Detection and Prevention
- **Intrusion Detection Systems (IDS):** Check for signatures of known attacks and anomalies indicating malicious activity.
- **Intrusion Prevention Systems (IPS):** Actively stop anomalies.

---

### Devices / Tools Comparison

| Device/Tool                  | Advantages                                                                                      | Disadvantages                                                                                   |
|-----------------------------|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **Firewall**                | Allows or blocks traffic based on set rules.                                                  | Can only filter packets based on header information.                                           |
| **Intrusion Detection System (IDS)** | Detects and alerts admins about possible intrusions and malicious traffic.                   | Can only detect known or obvious attacks; does not stop traffic.                               |
| **Intrusion Prevention System (IPS)** | Monitors activity and actively stops intrusions.                                           | Inline device; failure can disrupt network; risk of false positives blocking legit traffic.    |
| **Security Information and Event Management (SIEM)** | Collects and analyzes log data from multiple machines, aggregates security events in dashboards. | Only reports possible issues; does not actively prevent or stop threats.                       |


---

## DAY 6 01/07/25: Network Intrusion Attacks

### Denial of Service (DoS) Attack
- Overloads an organization’s network causing it to crash.
- **Distributed Denial of Service (DDoS):** Uses multiple devices to overwhelm the network.

### Network Level DoS Attacks
- **SYN Flood Attack:** Simulates TCP connections by flooding the server with SYN packets.
- **ICMP Flood Attack:** Uses Internet Control Message Protocol packets to overwhelm a target.
- **Ping of Death:** Sends massive, malformed packets to crash the target system.

### Network Protocol Analyzer / Packet Sniffer Tools
- SolarWinds NetFlow Traffic Analyzer  
- ManageEngine OpManager  
- Azure Network Watcher  
- Wireshark  
- Tcpdump  

### Packet Capture Includes:
- Timestamps  
- Source IP  
- Source Port  
- Destination IP  
- Destination Port  
> Hackers can use packet sniffers to access valuable data.

### Packet Sniffing Types
- **Passive Packet Sniffing:** Reading data packets as they transit the network without altering them.  
- **Active Packet Sniffing:** Manipulating packets while in transit to capture or alter data.

### Prevention Measures
- Use VPNs to encrypt data traffic.  
- Use HTTPS on websites to encrypt data in transit.  
- Avoid using unsecured Wi-Fi networks, as anyone on the network can potentially access your data.

### Common Network Attacks
- **IP Spoofing:** Hacker changes the source IP address of packets to impersonate trusted devices.  
- **On-Path Attack (Man-in-the-Middle):** Malicious actor intercepts and potentially alters communication between two authorized parties.  
- **Replay Attack:** Attacker intercepts data packets and retransmits them later to gain unauthorized access or disrupt communication.  
- **Smurf Attack:** Combination of DDoS and IP spoofing; floods a target IP address by amplifying ICMP requests.

### Protection Against These Attacks
- Use encryption protocols to secure data transmission.  
- Configure firewalls to validate IP addresses and block suspicious traffic.  

---

## DAY 5 30/06/25: Firewalls, VPNs, Proxy Servers

### Network Protocols

- **TCP Communication**  
  - TCP isn’t limited to just two devices. It establishes a direct connection between two endpoints, but the underlying network infrastructure can route data packets across multiple devices.  
  - TCP verifies both devices through a handshake.  

- **ARP (Address Resolution Protocol)**  
  - Used to map IP addresses to MAC addresses on a local network.  

- **HTTPS**  
  - Provides a secure network communication channel.  

- **DNS (Domain Name System)**  
  - Translates domain names into IP addresses.  

- **Other protocols:**  
  - **TTPS:** Uses SSL/TLS to encrypt data (likely meant HTTPS).  
  - **SNMP:** Simple Network Management Protocol.  
  - **ICMP:** Internet Control Message Protocol.  
  - **SFTP:** Secure File Transfer Protocol.  
  - **Telnet:** Remote login protocol (insecure).  
  - **SSH (Secure Shell):** Secure remote login.  
  - **Post Office Protocols:** Email retrieval protocols (e.g., POP3).  


### Firewalls

- A network security device that monitors traffic to and from your network.  
- Can allow or block traffic using **port filtering**, which controls communication by port numbers.  

- **Types of firewalls:**  
  - **Hardware firewalls:** Inspect each data packet at the network edge.  
  - **Software firewalls:** Inspect traffic received by a specific computer. Network-wide software firewalls check all network traffic but add a software burden.  
  - **Cloud-based firewalls:** Configurable via the cloud with custom rules.  

- **Firewall operation modes:**  
  - **Stateful:** Analyzes traffic trends and maintains context of active connections.  
  - **Stateless:** Operates based on predefined rules without keeping track of state.  

- **Next Generation Firewall (NGFW):**  
  - Performs deep packet inspection, intrusion detection, and uses threat intelligence.  


### VPNs (Virtual Private Networks)

- Changes your IP address and hides your virtual location.  
- Keeps data private when using public networks.  
- Uses **encapsulation** — wraps sensitive data inside other data packets.  
- Encrypts all internet traffic and transmits it through encrypted tunnels requiring keys to decrypt.  
- Helps protect privacy by encrypting all internet traffic.  


### Security Zones and Network Segmentation

- A **security zone** is a segment of a network designed to protect internal networks using **network segmentation**.  
- Acts as a barrier within internal networks, e.g., guest WiFi vs staff WiFi at a hotel.  
- Types of zones:  
  - **Uncontrolled zone:** Outside the organization’s control.  
  - **Controlled zone:** Internal networks under security policies.  
  - **DMZ (Demilitarized Zone):** Contains public-facing services (web servers, proxy servers, DNS servers) accessible from the internet but isolated from the internal network.  


### Subnetting

- The subdivision of a network into logical smaller subgroups.  
- Uses **CIDR (Classless Inter-Domain Routing)** notation for subnetting.  
- CIDR format: IPv4 address followed by a slash and a number (IP network prefix), e.g., `192.168.1.0/24`.  


### Proxy Servers

- A dedicated server acting as an intermediary between the internet and an internal network.  
- Functions:  
  - Blocks unsafe websites.  
  - Caches external data temporarily to reduce contact with internal services.  

- Types of proxies:  
  - **Forward proxy:** Regulates and restricts a user's access to the internet.  
  - **Reverse proxy:** Regulates and restricts external access to internal servers.  
  - **Email proxy server:** Filters spam emails.  


### VPN Types: Remote Access and Site-to-Site

- **WireGuard VPN:**  
  - A high-speed, open-source VPN protocol with advanced encryption.  
- **IPSec VPN:**  
  - A legacy VPN protocol, more complex than WireGuard but widely used.  


---

## DAY 4 27/06/25: SIEM 

### SIEM Tools & SOAR

- **SIEM (Security Information and Event Management)** tools log and analyze data from:
  - Firewall logs
  - Network logs
  - Server logs
- **Uses**: Create dashboards, monitor metrics (e.g., response time, failure rate)
- **SOAR (Security Orchestration, Automation and Response)**: Automates response using playbooks and workflows
- **Deployment Types**:
  - Self-hosted, cloud-hosted, hybrid
  - Tools: Splunk, Chronicle, Elastic
  - Open-source examples: Suricata, Linux tools
- **Playbooks**: Step-by-step manuals for incident response
  - **6 Phases**:
    1. Preparation  
    2. Detection and Analysis  
    3. Containment  
    4. Eradication and Recovery  
    5. Post-Incident Activity  
    6. Coordination  


### Networks

- A network is a group of connected devices communicating via MAC and IP addresses
- **LAN** – Local Area Network (small area)  
- **WAN** – Wide Area Network (large area)
- **Devices**:
  - **Hub** – Broadcasts to all devices
  - **Switch** – Sends to intended devices only
  - **Router** – Connects multiple networks
  - **Modem** – Connects network to the internet
- **Firewall** – Controls incoming/outgoing traffic
- **Simulation Tools**: Cisco Packet Tracer
- **Cloud Computing Models** (CSP):
  - **IaaS** – Infrastructure as a Service
  - **PaaS** – Platform as a Service
  - **SaaS** – Software as a Service

![Cloud Models](Images/cloud-models.png)


### Data Packets

- **Packet Structure**:
  - **Header** – IP, MAC, Protocol
  - **Body** – Message content
  - **Footer** – Signals end of packet
- **Bandwidth** – Amount of data received per second
- **Packet Sniffing** – Inspecting packets in transit


### TCP/IP Model

- **Purpose**: Organizes and transmits data across networks
- **4 Layers**:
  1. Application – HTTP, DNS, TLS  
  2. Transport – TCP, UDP  
  3. Internet – IP routing  
  4. Network Access – Hardware & data link
- **Common Ports**:
  - 25 – Email  
  - 443 – Secure web traffic  
  - 20 – Large file transfers


### OSI Model (7 Layers)

1. Application  
2. Presentation  
3. Session  
4. Transport  
5. Network  
6. Data Link  
7. Physical  


### IP Addressing & IPv4 Packet Header

- **IPv4 vs IPv6** – Can be public or private
- **Private IPs** – Used only within the same internal network

#### 13 Fields in IPv4 Header

1. **Version (VER)** – IP version used (e.g., IPv4)
2. **Header Length (IHL)** – Length of the header
3. **Type of Service (ToS)** – Quality of service indicator
4. **Total Length** – Length of header + data
5. **Identification** – Unique ID for packet reassembly
6. **Flags** – Fragmentation status
7. **Fragment Offset** – Position of this fragment
8. **Time to Live (TTL)** – Packet expiry to avoid endless looping
9. **Protocol** – Indicates transport protocol (TCP/UDP)
10. **Header Checksum** – Error detection
11. **Source IP Address** – Sender’s IP
12. **Destination IP Address** – Receiver’s IP
13. **Options** – Optional settings if header is extended

---

## DAY 3 25/06/25 - Risk Management, Audits, and Threats - Google Course

### Security Posture & Risk Management
- A strong **security posture** includes:
  - Clear security goals and objectives
  - Risk mitigation processes
  - Compliance with laws (e.g., GDPR, APRA CPS 234)
  - Business continuity plans
  - Ethical and legal security practices

- **Risk Management Steps (NIST RMF)**:
  1. **Prepare** – Understand org context, assets, and resources
  2. **Categorize** – Identify asset criticality and impact levels
  3. **Select** – Choose appropriate controls (e.g., from NIST 800-53)
  4. **Implement** – Deploy security controls across systems
  5. **Assess** – Evaluate control effectiveness
  6. **Authorize** – Approve system operations based on risk
  7. **Monitor** – Continuously track security and risks

- Common **organizational risks**:
  - Misconfigurations
  - Unpatched software
  - Shadow IT
  - Weak access controls

### Audits & Vulnerability Management

- **Security Audit** = structured evaluation of controls, policies, and procedures.
  - Can be internal or external
  - Checks compliance against standards (e.g., ISO 27001, NIST, SOC 2)
  - Assesses whether controls are sufficient to protect critical assets

- **Internal Audit Steps**:
  1. Define scope and goals
  2. Risk assessment of critical assets
  3. Evaluate control implementation
  4. Identify gaps and compliance issues
  5. Report findings and improvement plans

### Real-World Vulnerabilities (Examples)

| Vulnerability | Impact |
|---------------|--------|
| **ProxyLogon** | Exploits Microsoft Exchange (pre-auth RCE) |
| **ZeroLogon** | Bypass Netlogon authentication (domain takeover) |
| **Log4Shell** | RCE in Log4j logging framework |
| **PetitPotam** | Forces NTLM authentication to hijack sessions |
| **SSRF** | Tricks server to access unintended backend services |
| **Security Logging Failures** | Enables undetected attacks due to poor log monitoring |

### OWASP Security Principles (Expanded)
These support secure design and development:
- **Minimize attack surface**
- **Principle of least privilege**
- **Defense in depth**
- **Fail securely** – systems fail in a way that maintains security
- **Fix issues correctly** – apply root cause fixes, not patches
- **Keep security simple** – avoid overly complex controls
- **Separation of duties** – no one person has total control
- **Avoid security through obscurity**
- **Don’t trust external services by default**

### Threats, Risks & Impacts

| Term | Definition |
|------|------------|
| **Threat** | A potential cause of harm (e.g., hacker, malware) |
| **Vulnerability** | Weakness that can be exploited (e.g., unpatched system) |
| **Risk** | Probability + impact of a threat exploiting a vulnerability |

**Examples of threats:**
- **Ransomware** – Locks data and systems, demands payment
- **Phishing** – Deceives users to gain sensitive info
- **Insider threats** – Malicious or negligent employees

**Impacts of security incidents:**
- Financial losses (e.g., ransomware payouts, breach costs)
- Reputational damage
- Identity theft
- Legal or regulatory fines

### Web Layers Overview
- **Surface Web**: Indexed, public (Google, Wikipedia)
- **Deep Web**: Hidden behind logins (bank portals, intranets)
- **Dark Web**: Encrypted networks (accessed via Tor), anonymous traffic


### Reflections / What I Learned
- Understanding **audit frameworks** and **risk frameworks** helps align cybersecurity with business.
- Real-world vulnerabilities (e.g., Log4Shell) show why regular patching and monitoring is vital.
- Strong **foundational principles (OWASP)** are essential even in modern cloud-based environments.

---

## DAY 2 24/06/25: Foundations of Cybersecurity - Google Course
https://grow.google/certificates/en_au/certificates/cybersecurity/?utm_source=google&utm_medium=paidsearch&utm_campaign=ha-sem-bk-cs-exa-mid__geo%E2%80%94AU&utm_term=google%20cyber%20security%20certification&utm_content=RSA1&gwg_campaign_id=22282035594&gad_source=1&gad_campaignid=22282035594&gbraid=0AAAAApjPcOJM3Co18Strlt1tJm4d3un93&gclid=CjwKCAjwmenCBhA4EiwAtVjzmkMLWYodkW0CQBJ2ChK6SZgBmwAYeVMAhq0yoBkHw6_tOf9b-cO6_BoCozEQAvD_BwE&gclsrc=aw.ds
### Foundations of Cybersecurity – Key Learnings  
#### Security Domains Overview

##### 1. Security and Risk Management
- Update and enforce company security policies
- Align practices with legal, regulatory, and business requirements

##### 2. Asset Security
- Classify and handle data appropriately
- Ensure proper disposal and destruction of hardware and sensitive materials

##### 3. Security Architecture and Engineering
- Design and implement secure systems
- Configure firewalls and security infrastructure

##### 4. Communication and Network Security
- Use secure network protocols (e.g., VPNs)
- Protect data in transit and ensure secure communication channels

##### 5. Identity and Access Management (IAM)
- Control who has access to what
- Validate user roles, permissions, and use of access devices (e.g., key cards)
- Secure authentication and authorization

##### 6. Security Assessment and Testing
- Conduct audits, risk assessments, and penetration testing
- Identify vulnerabilities before attackers do

##### 7. Security Operations
- Monitor and investigate security events
- Respond to incidents and perform forensics

##### 8. Software Development Security
- Secure coding practices and code reviews
- Integrate security throughout the development lifecycle (DevSecOps)

#### Security Frameworks and Principles

- Identify and analyze critical assets
- Implement structured guidelines to mitigate risk
- Manage the **Security Lifecycle**
- Protect:
  - **PII** (Personally Identifiable Information)
  - Financial and sensitive business data
- Comply with data laws (e.g., **GDPR**)
- Define and document security goals
- Apply **Security Controls** and enforce strong security processes
- Communicate risks and results effectively

#### Core Concepts:
- **CIA Triad**:
  - **Confidentiality**
  - **Integrity**
  - **Availability**
- **NIST Cybersecurity Framework (CSF)**:
  - Provides a baseline to manage both short- and long-term cybersecurity risks

#### Ethics in Cybersecurity

- Practice ethical behavior when handling data and systems
- Preserve evidence correctly with chain of custody protocols
- Follow legal standards and industry guidelines

#### Tools and Techniques

##### SIEM Tools (Security Information and Event Management)
- Collect and analyze real-time security data
- Generate alerts for anomalies
- Examples: **Elastic**, **Splunk**, **Google Chronicle**

##### Packet Sniffers
- Tools like `tcpdump` and **Wireshark** used to analyze network traffic

##### Incident Response Playbooks
- Define step-by-step actions for handling incidents
- Include:
  - **Order of volatility** (what to collect first)
  - Chain of custody
  - Evidence handling procedures

---

## DAY 1 19/06/25: Internet Basics
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

---

### OSI Model
The OSI (Open Systems Interconnection) Model defines how data is transferred through a network. It consists of 7 layers, each responsible for a specific aspect of communication. Each layer uses a package of protocols.
The 7 Layers of the OSI Model (Top to Bottom):
Application Layer

The **OSI (Open Systems Interconnection)** Model defines how data is transferred through a network. It consists of **7 layers**, each responsible for a specific aspect of communication. Each layer uses a package of protocols.

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

##### 4. Transport Layer
- Ensures **reliable data transfer** via segmentation, flow control, and error control.
- **Segmentation**: Splits data into segments with port and sequence numbers.
- **Flow Control**: Manages the rate of data transmission.
- **Error Control**: Uses **ARQ (Automatic Repeat Request)** and checksums.
- **Protocols**: `TCP` (reliable, connection-based), `UDP` (fast, connectionless – e.g., streaming).

##### 5. Network Layer
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


> 💡 **Mnemonic to remember the OSI layers (top-down):**  
**All People Seem To Need Data Processing**  
(Application, Presentation, Session, Transport, Network, Data Link, Physical)

Link: https://www.youtube.com/watch?v=vv4y_uOneC0

---
