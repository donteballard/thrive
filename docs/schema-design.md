# Thrive - Schema Design

## Database Schema

### Users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    wallet_address VARCHAR(44) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(255),
    avatar_url TEXT,
    experience_points BIGINT DEFAULT 0,
    level INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_premium BOOLEAN DEFAULT FALSE
);
```

### User Profiles
```sql
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    bio TEXT,
    health_goals TEXT[],
    financial_goals TEXT[],
    personal_goals TEXT[],
    timezone VARCHAR(50),
    preferences JSONB,
    social_links JSONB,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Staking
```sql
CREATE TABLE staking_positions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    amount DECIMAL(20,9) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    tier VARCHAR(20) NOT NULL,
    rewards_earned DECIMAL(20,9) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks
```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    difficulty INTEGER,
    reward_points INTEGER,
    token_reward DECIMAL(20,9),
    verification_type VARCHAR(50),
    required_proof TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Tasks
```sql
CREATE TABLE user_tasks (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    task_id UUID REFERENCES tasks(id),
    status VARCHAR(20) DEFAULT 'pending',
    proof_submitted TEXT,
    completed_at TIMESTAMP,
    verified_at TIMESTAMP,
    rewards_claimed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Achievements
```sql
CREATE TABLE achievements (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    requirements JSONB,
    reward_points INTEGER,
    nft_metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Achievements
```sql
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    achievement_id UUID REFERENCES achievements(id),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nft_mint_address VARCHAR(44)
);
```

### Health Metrics
```sql
CREATE TABLE health_metrics (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    metric_type VARCHAR(50),
    value DECIMAL(10,2),
    unit VARCHAR(20),
    source VARCHAR(50),
    recorded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Financial Metrics
```sql
CREATE TABLE financial_metrics (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    metric_type VARCHAR(50),
    amount DECIMAL(20,2),
    currency VARCHAR(10),
    category VARCHAR(50),
    recorded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Community Challenges
```sql
CREATE TABLE community_challenges (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    reward_pool DECIMAL(20,9),
    max_participants INTEGER,
    requirements JSONB,
    status VARCHAR(20) DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Challenge Participants
```sql
CREATE TABLE challenge_participants (
    id UUID PRIMARY KEY,
    challenge_id UUID REFERENCES community_challenges(id),
    user_id UUID REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'active',
    progress JSONB,
    rewards_earned DECIMAL(20,9) DEFAULT 0,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Blockchain Data Structures

### Token Contract
```rust
#[account]
pub struct TokenConfig {
    pub authority: Pubkey,
    pub mint: Pubkey,
    pub total_supply: u64,
    pub decimals: u8,
    pub staking_enabled: bool,
    pub rewards_rate: u64,
}
```

### Staking Contract
```rust
#[account]
pub struct StakeAccount {
    pub owner: Pubkey,
    pub amount: u64,
    pub start_time: i64,
    pub end_time: Option<i64>,
    pub rewards_earned: u64,
    pub tier: StakingTier,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum StakingTier {
    Bronze,
    Silver,
    Gold,
    Platinum
}
```

### Achievement NFT Metadata
```json
{
    "name": "Achievement Title",
    "symbol": "THRIVE",
    "description": "Achievement description",
    "image": "ipfs://...",
    "attributes": [
        {
            "trait_type": "Category",
            "value": "Health"
        },
        {
            "trait_type": "Difficulty",
            "value": "Rare"
        },
        {
            "trait_type": "Points",
            "value": 1000
        }
    ]
}
``` 