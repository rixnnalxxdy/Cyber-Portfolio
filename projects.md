[Home](index.md) | [Learnings](learnings.md)

# Project #2 – 25/06/25  
## Security Audit Review – Botium Toys

**Goal:** Assess the security posture of Botium Toys by identifying existing controls, evaluating compliance, and recommending improvements using a risk-based approach.
Link to audit i reviewed: https://docs.google.com/document/d/1s2u_RuhRAI40JSh-eZHvaFsV1ZMxcNSWXifHDTOsgFc/template/preview#heading=h.evidx83t54sc

---

### What I Learned

- How to structure a full audit using scope, assets, controls, and risk scoring  
- How to apply the NIST CSF framework and compliance standards (PCI DSS, GDPR, SOC)  
- Importance of encryption, least privilege, and disaster recovery  
- The trade-offs between physical site separation vs internal zoning  
- Translating security gaps into actionable business-friendly recommendations

---

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

---

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

# Project #1 19/06/25
## Home Network Mapping Project

**Goal:** Understand how my home devices connect to each other and to the internet, and learn to identify network components using basic commands.

---

### What I Learned

- The difference between IPv4, subnet mask, and default gateway
- Dynamic vs static IP addresses
- The role of routers and ISPs in connecting to the internet
- How data travels in packets across multiple network "hops"
- Tools like `ipconfig`, `arp -a`, and `tracert`

---

### Tools & Commands Used

| Command       | Purpose                                  |
|---------------|-------------------------------------------|
| `ipconfig`    | View IP address, gateway, and adapter info |
| `arp -a`      | List devices connected to the same local network |
| `tracert`     | Trace the path to an external server (e.g., Google) |

---

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
