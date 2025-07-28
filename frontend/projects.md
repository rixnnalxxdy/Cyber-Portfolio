[Home](frontend/index.md) | [Learnings](frontend/learnings.md)

# Activity 7 05/07/25: DDoS Attack Incident Analysis & NIST CSF Security Plan

## Scenario Summary  
A multimedia company experienced a DDoS attack that flooded its internal network with ICMP packets, causing network services to become unresponsive for two hours. The attacker exploited an unconfigured firewall to overwhelm network resources. The incident management team mitigated the attack by blocking ICMP packets and stopping non-critical services.

## Actions Taken by Network Security Team  
- Implemented firewall rule to rate-limit incoming ICMP packets  
- Enabled source IP verification to block spoofed ICMP packets  
- Deployed network monitoring software to detect abnormal traffic patterns  
- Installed IDS/IPS to filter suspicious ICMP traffic  

## NIST Cybersecurity Framework (CSF) Analysis and Security Strategy

### Identify  
- DDoS attack revealed vulnerabilities in firewall configuration and internal network infrastructure.  
- Critical assets affected: network services, firewall, internal servers.  
- Business processes disrupted: file sharing, web development tools, client communications.  
- Recommendation: Maintain comprehensive inventory of assets, systems, software, and users.  
- Key personnel: incident management, cybersecurity staff, network admins require secure access for prevention and response.

### Protect  
- Limit ICMP traffic with rate-limiting firewall rules and source IP verification to block spoofed packets.  
- Restrict network access to trusted sources only.  
- Provide cybersecurity awareness and training focused on DDoS threat identification and mitigation.  
- Continue data protection via encryption and network segmentation.  
- Review and patch outdated hardware and misconfigured software.  
- Deploy protective technologies: IPS, updated firewall rules, traffic filtering.

### Detect  
- Deploy Security Information and Event Management (SIEM) to monitor and analyze logs for anomalies like unusual ICMP volume.  
- Use continuous network monitoring tools to detect early attack signs.  
- Utilize tcpdump or packet sniffers for incident analysis.  
- Maintain an Intrusion Detection System (IDS) to detect repeated ICMP requests and blacklisted IP traffic.  
- Layered detection systems ensure timely threat identification.

### Respond  
- Develop and maintain a detailed DDoS-specific incident response playbook.  
- Establish clear, resilient communication channels independent of affected protocols.  
- Analyze logs and packet captures to identify attack origin and scope.  
- Mitigation steps include: offline non-essential services, rate-limit ICMP, isolate affected systems.  
- Conduct post-incident reviews to improve response procedures.

### Recover  
- Restore critical services in a prioritized, controlled manner once the attack is mitigated.  
- Review and improve recovery systems such as DDoS mitigation services and backup protocols.  
- Communicate recovery status and necessary actions clearly to IT staff and users.  
- Conduct follow-up training and distribute post-incident summaries for continuous improvement.

---

# Activity 6 03/07/25: Security Hardening Recommendations

## Scenario  
I am security analyst for a social media organization that recently suffered a major data breach exposing personal customer information. After a network inspection, four major vulnerabilities were found:

1. Employees share passwords.  
2. Admin password for the database is set to the default.  
3. Firewalls lack rules to filter inbound/outbound traffic.  
4. Multifactor Authentication (MFA) is not used.

Without addressing these issues, future breaches or attacks are likely.

## Part 1: Hardening Tools and Methods to Implement

### 1. Enforce Strong Password Policies  
- Require minimum complexity (uppercase, lowercase, numbers, special characters).  
- Mandate regular password changes and prohibit password reuse.  
- Train employees to never share credentials.

### 2. Implement Stateful Firewalls with Port Filtering  
- Configure firewalls to inspect traffic based on connection state.  
- Define rules to allow only necessary inbound and outbound traffic.  
- Block unused or high-risk ports to reduce attack surface.

### 3. Deploy Multifactor Authentication (MFA)  
- Require at least two authentication factors (e.g., password + mobile code or biometric).  
- Apply MFA especially to sensitive systems like databases and admin panels.  
- Ensure users receive alerts for unauthorized access attempts.

## Part 2: Explanation of Recommendations

### Password Policies  
- Strong, complex passwords reduce effectiveness of brute force or dictionary attacks.  
- Preventing password sharing improves accountability and reduces insider risks.  
- Regular updates limit risk from exposed or leaked credentials.

### Stateful Firewalls with Port Filtering  
- Stateful inspection allows only legitimate established connections, blocking unsolicited traffic.  
- Port filtering reduces exposure by closing unnecessary services.  
- Helps maintain a secure network perimeter and limits lateral movement within the network.

### Multifactor Authentication (MFA)  
- Adds an extra layer of security beyond passwords, protecting against compromised credentials.  
- Provides real-time alerts to suspicious login attempts, enabling quick response.  
- Essential for securing administrative accounts and sensitive customer data.

---

# Activity 5 03/07/25: Web Server Compromise and Brute Force Attack

**Logs file:**  
[tcpdump Logs Document](https://docs.google.com/document/d/1HDAQTLSK5CyPLPHeLI0s75kNE-kA2kG0NFJoZlz0xCc/template/preview?resourcekey=0-vDSHnW4qKxOOQtsZeGRUeQ)

## Section 1: Network Protocol Involved  
- **HTTP (Hypertext Transfer Protocol)**  
- Default TCP port: **80**  
- Used for unencrypted web traffic.

## Section 2: Incident Documentation  
Analysis of tcpdump logs reveals:  
- High volumes of traffic on port 80, indicating possible exploitation of unencrypted HTTP.  
- Repeated HTTP GET requests from **yummyrecipesforme.com**, suggesting download of potentially malicious files.  
- Traffic later shifts to a different IP address with a change in port number and spoofed domain, indicating possible command-and-control communication or redirection to a malicious host.

This behaviour suggests early-stage malware delivery followed by attempts to establish persistent attacker communication.

## Section 3: Remediation Recommendation for Brute Force Attacks  
- Enforce **Multi-Factor Authentication (MFA)** as a highly effective mitigation.  
- MFA requires a second verification step (e.g., authenticator app, SMS code, hardware token) besides the password.  
- Even if the password is compromised by brute force, MFA blocks unauthorized access.  
- MFA also notifies users of login attempts, enabling early detection and response.


---

# Activity 4 01/07/25: SYN Flood Attack Investigation

**Logs file:**  
[Network Logs Spreadsheet](https://docs.google.com/spreadsheets/d/1enpRzrIao3J2Lp2tOI0hmu1Cu7D7CjLGhFAiTiR9J64/template/preview?gid=218501934#gid=218501934)

## Section 1: Attack Identification  
The network interruption and website connection timeout are likely caused by a **SYN flood attack**, a type of Denial of Service (DoS) attack.

- Logs show a single IP rapidly sending many TCP SYN packets (~120 bytes each) in quick succession.
- These SYN packets do not receive the final ACK to complete the TCP handshake.
- This behavior overloads the server’s resources by leaving many half-open connections.
- This pattern matches a SYN flood, aiming to exhaust the server’s connection handling capacity.

## Section 2: How the Attack Causes Malfunction  
A normal TCP connection involves a three-way handshake:  
- **SYN:** Client requests connection.  
- **SYN-ACK:** Server acknowledges.  
- **ACK:** Client confirms, establishing connection.

In this attack:  
- The attacker floods the server with many SYN packets without completing the handshake.  
- The server allocates resources for each connection request but never completes them, leading to resource exhaustion.

### Log Evidence  
- **Gateway Timeout Error (Log 77):** Server overwhelmed, unable to complete handshakes.  
- **RST, ACK Error (Log 92):** Server did not receive expected ACK, resetting connections and facing repeated SYN requests.

This results in legitimate users being unable to establish connections, making the website unreachable.


---

# Activity 3 01/07/25: DNS and ICMP Traffic Analysis

## Scenario Summary
I analyzed DNS and ICMP traffic using a network protocol analyzer tool during a cybersecurity incident.

Several customers reported inability to access the client company website **www.yummyrecipesforme.com**, receiving the error **“destination port unreachable”** after waiting for the page to load.

## Traffic Log Findings (tcpdump)

1. Initial outgoing DNS request from the user’s computer (192.51.100.15) to the DNS server (203.0.113.2) on UDP port 53.
2. The DNS server responded with an ICMP error indicating UDP port 53 was unreachable.
3. Timestamps indicate the incident started at **13:24:32.192571** (1:24 p.m.).
4. Source and destination IPs follow the pattern:  
   - Request: `192.51.100.15 > 203.0.113.2.domain`  
   - ICMP error response: `203.0.113.2 > 192.51.100.15`
5. Flags in DNS query included query identification (35084), and "A?" indicating DNS A record request.
6. The error message "udp port 53 unreachable" means no service was listening on port 53 on the DNS server.
7. Multiple repeated ICMP error responses show persistent failure.

## Part 1: Problem Summary
The tcpdump logs reveal DNS resolution failures caused by the DNS server’s UDP port 53 being unreachable. This indicates the DNS service was down or blocked, preventing domain resolution and resulting in client access failure.

## Part 2: Analysis and Potential Causes
- Incident timestamp: 1:24:32 p.m.
- Client’s DNS queries were sent via UDP but met with ICMP “port unreachable” errors.
- The repeated error suggests persistent failure.

Possible causes include:
- DNS server misconfiguration or downtime.
- Firewall blocking UDP traffic on port 53.
- Intentional disruption such as a denial-of-service attack or sabotage.

No direct evidence of flooding, but repeated failed queries at scale could indicate DoS-like symptoms.

## Recommended Next Steps
- Verify DNS server status and configuration.
- Check firewall rules for UDP port 53 restrictions.
- Investigate if this incident is part of a broader attack pattern.

---


# Activity #2 – 25/06/25  
## Security Audit Review – Botium Toys

**Goal:** Assess the security posture of Botium Toys by identifying existing controls, evaluating compliance, and recommending improvements using a risk-based approach.
Link to audit i reviewed: https://docs.google.com/document/d/1s2u_RuhRAI40JSh-eZHvaFsV1ZMxcNSWXifHDTOsgFc/template/preview#heading=h.evidx83t54sc

### What I Learned

- How to structure a full audit using scope, assets, controls, and risk scoring  
- How to apply the NIST CSF framework and compliance standards (PCI DSS, GDPR, SOC)  
- Importance of encryption, least privilege, and disaster recovery  
- The trade-offs between physical site separation vs internal zoning  
- Translating security gaps into actionable business-friendly recommendations

### Controls & Compliance Checklist

#### Controls Assessment

| Control                                                             | Implemented |
|---------------------------------------------------------------------|-------------|
| Least Privilege                                                     | ❌           |
| Disaster Recovery Plans                                             | ❌           |
| Password Policies                                                   | ✅           |
| Separation of Duties                                                | ❌           |
| Firewall                                                            | ✅           |
| Intrusion Detection System (IDS)                                    | ❌           |
| Backups                                                             | ❌           |
| Antivirus Software                                                  | ✅           |
| Legacy Systems (manual monitoring, maintenance, intervention)       | ✅           |
| Encryption                                                          | ❌           |
| Password Management System                                          | ❌           |
| Locks (offices, storefront, warehouse)                              | ✅           |
| Closed-circuit television (CCTV) surveillance                       | ✅           |
| Fire detection/prevention (alarm, sprinklers, etc.)                 | ✅           |

#### Compliance Assessment

**PCI DSS**

| Best Practice                                                       | Implemented |
|---------------------------------------------------------------------|-------------|
| Only authorized users can access cardholder data                    | ❌          |
| Cardholder data is securely stored, accepted, processed, transmitted| ❌          |
| Data encryption procedures implemented                              | ❌          |
| Secure password management policies adopted                         | ❌          |

**GDPR**

| Best Practice                                                       | Implemented |
|---------------------------------------------------------------------|-------------|
| E.U. customer data is kept private/secure                           | ✅          |
| 72-hour breach notification plan for E.U. customers                 | ✅          |
| Data is properly classified and inventoried                         | ❌          |
| Privacy policies/processes enforced company-wide                    | ✅          |

**SOC 1 / SOC 2**

| Best Practice                                                       | Implemented |
|---------------------------------------------------------------------|-------------|
| User access policies established                                    | ❌           |
| Sensitive data (PII/SPII) kept confidential                         | ❌           |
| Data integrity controls in place                                    | ✅           |
| Authorized access to data is ensured                                | ✅           |


### Summary of What I Did

1. **Completed Checklist:**  
   Assessed controls like firewall, antivirus, password policy, IDS, encryption, backups, and physical protections. Mapped gaps against standards like PCI DSS, GDPR, and SOC 2.

2. **Wrote Recommendations:**  
   - Immediate action required:  
     - Implement data encryption  
     - Enforce least privilege and role separation  
     - Establish disaster recovery plans and backups  
   - Additional option:  
     - Separate physical sites or enforce zoning with ID-based access for warehouse, storefront, and office zones.

3. **Reflected on Outcomes:**  
   Learned how to write stakeholder-ready audit reports with clear, prioritized recommendations.

---

# Activity #1 19/06/25
## Home Network Mapping Project

**Goal:** Understand how my home devices connect to each other and to the internet, and learn to identify network components using basic commands.

### What I Learned

- The difference between IPv4, subnet mask, and default gateway
- Dynamic vs static IP addresses
- The role of routers and ISPs in connecting to the internet
- How data travels in packets across multiple network "hops"
- Tools like `ipconfig`, `arp -a`, and `tracert`

### Tools & Commands Used

| Command       | Purpose                                  |
|---------------|-------------------------------------------|
| `ipconfig`    | View IP address, gateway, and adapter info |
| `arp -a`      | List devices connected to the same local network |
| `tracert`     | Trace the path to an external server (e.g., Google) |

### Summary of What I Did

1. **Identified My Network Adapter:**  
   Used `ipconfig` to find the active adapter (Wireless LAN adapter Wi-Fi) and note the IPv4 and default gateway addresses.  

2. **Discovered Connected Devices:**  
   Ran `arp -a` and found multiple devices on my home LAN (e.g., phone, printer, smart TV).  

3. **Traced My Packet Route:**  
   Ran `tracert google.com`  
   ➤ Packets passed through ~9 hops from my device to Google's servers  
   ➤ First hop: my router (home gateway)  
   ➤ Middle hops: ISP routing points (e.g., Telstra regional routers)  
   ➤ Last hop: Google’s edge server

---
